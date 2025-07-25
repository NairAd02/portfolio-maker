"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { generateStorageFilePath } from "../images";
import { createClient } from "../supabase/server";
import { Project, ProjectCreateDTO } from "../types/projects";
import { getLoggedUser } from "./auth";
import { getImageUrlOrThrow } from "./supabase-storage";
import { uploadFileToSupabase } from "./supabase-storage";


export async function getProjectsList() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("project").select("*");
  if (error) return { data: null, error };

  const projects = data as Project[];

  try {
    const mappedProjects = await Promise.all(
      projects.map(async (project) => {
        let mainImage = undefined;
        if (project.mainImage) {
          mainImage = await getImageUrlOrThrow(supabase, project.mainImage);
        }

        let images: string[] = [];
        if (Array.isArray(project.images)) {
          images = await Promise.all(
            project.images.map(async (image) => {
              return await getImageUrlOrThrow(supabase, image);
            })
          );
        }

        return {
          ...project,
          mainImage,
          images,
        };
      })
    );
    return { data: mappedProjects, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

async function insertProjectImages(
  supabase: SupabaseClient<any, "public", any>,
  projectName: string,
  formData: FormData
) {
  // Procesar mainImage
  const mainImage = formData.get("mainImage") as File;
  let mainImagePath: string | undefined = undefined;
  if (mainImage) {
    mainImagePath = generateStorageFilePath(
      mainImage,
      `projects/${projectName}/mainImage`
    );
    const mainImageError = await uploadFileToSupabase(
      supabase,
      "portfolio-maker",
      mainImagePath,
      mainImage,
      "3600",
      false
    );
    if (mainImageError) return { data: null, error: mainImageError };
  }

  // Procesar imágenes adicionales
  const images = formData.getAll("images[]") as File[];
  let imagePaths: string[] = [];
  if (images && images.length > 0) {
    try {
      imagePaths = await Promise.all(
        images.map(async (image) => {
          const imagePath = generateStorageFilePath(
            image,
            `projects/${projectName}/images`
          );
          const uploadError = await uploadFileToSupabase(
            supabase,
            "portfolio-maker",
            imagePath,
            image,
            "3600",
            false
          );
          if (uploadError) throw uploadError;
          return imagePath;
        })
      );
    } catch (error) {
      return { data: null, error };
    }
  }
  return { data: { mainImage: mainImagePath, images: imagePaths } };
}

async function insertProjectTechnologies(
  supabase: SupabaseClient<any, "public", any>,
  projectId: string,
  technologies: string[]
) {
  const technologiesRelations = technologies.map((technology) => ({
    technology_id: technology,
    proyect_id: projectId,
  }));
  const { data, error: technologiesError } = await supabase
    .from("technology_has_proyect")
    .insert(technologiesRelations)
    .select()
    .single();
  if (technologiesError) return { data: null, error: technologiesError };

  return { data, error: null };
}

export async function createProject(
  projectCreateDTO: ProjectCreateDTO,
  formData: FormData
) {
  const { technologies, ...restProjectCreateDTO } = projectCreateDTO;
  const supabase = await createClient();

  // find the portfolio user
  const { data: imagesData, error: insertImagesError } =
    await insertProjectImages(supabase, restProjectCreateDTO.name, formData);

  if (!imagesData || insertImagesError)
    return { data: null, error: insertImagesError };

  // get the session
  const { data: sessionData, error: loggedUserError } = await getLoggedUser();

  if (!sessionData || loggedUserError) return { data: null, loggedUserError };

  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select("id")
    .eq("user_id", sessionData.user.id)
    .single();

  if (portfolioError) return { data: null, error: portfolioError };

  // Preparar el objeto para insertar
  const insertData = {
    ...restProjectCreateDTO,
    mainImage: imagesData.mainImage,
    images: imagesData.images,
    portfolio_id: portfolio.id,
  };

  const { data, error: projectError } = await supabase
    .from("project")
    .insert(insertData)
    .select()
    .single();
  if (projectError) return { data: null, error: projectError };

  const projectEntity = data as Project;

  // Insertar tecnologías relacionadas
  if (technologies && technologies.length > 0) {
    const { error: technologiesError } = await insertProjectTechnologies(
      supabase,
      projectEntity.id,
      technologies
    );

    if (technologiesError) return { data: null, error: technologiesError };
  }

  return { data: projectEntity, error: null };
}
