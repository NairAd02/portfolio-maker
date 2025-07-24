"use server";
import { generateStorageFilePath } from "../images";
import { createClient } from "../supabase/server";
import { Project, ProjectCreateDTO } from "../types/projects";
import { getLoggedUser } from "./auth";
import { getPublicImageUrl } from "./supabase-storage";
import { uploadFileToSupabase } from "./supabase-storage";

export async function getProjectsList() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("project").select("*");
  const projects = data as Project[];

  return {
    data: projects.map((project) => ({
      ...project,
      mainImage: getPublicImageUrl(supabase, project.mainImage),
      images: Array.isArray(project.images)
        ? project.images.map((image) => getPublicImageUrl(supabase, image))
        : [],
    })),
    error,
  };
}

export async function createProject(
  projectCreateDTO: ProjectCreateDTO,
  formData: FormData
) {
  const { technologies, ...restProjectCreateDTO } = projectCreateDTO;
  const supabase = await createClient();

  // Procesar mainImage
  const mainImage = formData.get("mainImage") as File;
  let mainImagePath: string | undefined = undefined;
  if (mainImage) {
    mainImagePath = generateStorageFilePath(
      mainImage,
      `projects/${restProjectCreateDTO.name}/mainImage`
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
            `projects/${restProjectCreateDTO.name}/images`
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

  // find the portfolio user

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
    mainImage: mainImagePath,
    images: imagePaths,
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
    const technologiesRelations = technologies.map((technology) => ({
      technology_id: technology,
      proyect_id: projectEntity.id,
    }));
    const { error: technologiesError } = await supabase
      .from("technology_has_proyect")
      .insert(technologiesRelations)
      .select()
      .single();
    if (technologiesError) return { data: null, error: technologiesError };
  }

  return { data: projectEntity, error: null };
}
