"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { generateStorageFilePath } from "../images";
import { createClient } from "../supabase/server";
import {
  Project,
  ProjectCreateDTO,
  ProjectDetails,
  ProjectEditDTO,
} from "../types/projects";
import { getLoggedUser } from "./auth";
import { getImageUrlOrThrow } from "./supabase-storage";
import { uploadFileToSupabase } from "./supabase-storage";
import { insertProjectTechnologies } from "./technologies";
import { Technology } from "../types/technologies";

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

export async function getProjectById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project")
    .select(
      `
      *,
      technology_has_proyect (
        technology (*)
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) return { data: null, error };

  const { technology_has_proyect, ...rest } = data;

  const technologies = technology_has_proyect.map(
    (thp: { technology: Technology }) => thp.technology
  );

  return {
    data: {
      ...rest,
      technologies,
      mainImage: data.mainImage
        ? await getImageUrlOrThrow(supabase, data.mainImage)
        : undefined,
      images: Array.isArray(data.images)
        ? await Promise.all(
            data.images.map(async (image: string) => {
              return await getImageUrlOrThrow(supabase, image);
            })
          )
        : [],
    } as ProjectDetails,
    error: null,
  };
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

export async function editProject(
  id: string,
  projectEditDTO: ProjectEditDTO,
  formData: FormData
) {
  const { technologies, ...restProjectEditDTO } = projectEditDTO;
  const supabase = await createClient();
  // find the project
  const { data: projectFind, error: findProjectError } = await supabase
    .from("project")
    .select("*")
    .eq("id", id)
    .single();

  if (findProjectError) return { data: null, error: findProjectError };

  const projectEntity = projectFind as Project;

  // update the images

  // first delete the images
  if (projectEntity.mainImage)
    await supabase.storage
      .from("portfolio-maker")
      .remove([projectEntity.mainImage]);
  if (projectEntity.images && projectEntity.images.length > 0)
    await supabase.storage.from("portfolio-maker").remove(projectEntity.images);

  // insert the images
  const { data: imagesData, error: insertImagesError } =
    await insertProjectImages(supabase, restProjectEditDTO.name, formData);

  if (!imagesData || insertImagesError)
    return { data: null, error: insertImagesError };

  // update project

  const { data: updateProjectData, error: updateProjectError } = await supabase
    .from("project")
    .update({
      ...restProjectEditDTO,
      mainImage: imagesData.mainImage,
      images: imagesData.images,
    })
    .eq("id", id)
    .select()
    .single();
  if (updateProjectError) return { data: null, error: updateProjectError };

  // update the technologies

  // first delete current technologies
  const { error: deleteTechnologiesError } = await supabase
    .from("technology_has_proyect")
    .delete()
    .eq("proyect_id", projectEntity.id);

  if (deleteTechnologiesError)
    return { data: null, error: deleteTechnologiesError };

  // insert new technologies
  if (technologies.length > 0) {
    const { error: insertTechnologiesError } = await insertProjectTechnologies(
      supabase,
      id,
      technologies
    );
    if (insertTechnologiesError)
      return { data: null, error: insertTechnologiesError };
  }

  return { data: updateProjectData, error: null };
}

// functions auxs

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
