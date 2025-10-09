"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { generateStorageFilePath } from "../images";
import { createClient } from "../supabase/server";
import {
  Project,
  ProjectCreateDTO,
  ProjectDetails,
  ProjectEditDTO,
  ProjectsFiltersDTO,
} from "../types/projects";
import { getLoggedUser } from "./auth";
import { getImageUrlOrThrow } from "./supabase-storage";
import { uploadFileToSupabase } from "./supabase-storage";
import { insertProjectTechnologies } from "./technologies";
import { Technology } from "../types/technologies";
import { StorageError } from "@supabase/storage-js";
import { v4 as uuidv4 } from "uuid";

export async function getProjectsList(projectFilters: ProjectsFiltersDTO) {
  const supabase = await createClient();

  const {
    name,
    description,
    problem,
    solution,
    impact,
    teachings,
    technologies,
  } = projectFilters || {};

  // Helper to apply all text-based filters once
  const applyTextFilters = (
    q: ReturnType<typeof supabase.from> extends infer T
      ? T extends { select: any }
        ? any
        : any
      : any
  ) => {
    let filtered = q;
    if (name && name.trim())
      filtered = filtered.ilike("name", `%${name.trim()}%`);
    if (description && description.trim())
      filtered = filtered.ilike("description", `%${description.trim()}%`);
    if (problem && problem.trim())
      filtered = filtered.ilike("problem", `%${problem.trim()}%`);
    if (solution && solution.trim())
      filtered = filtered.ilike("solution", `%${solution.trim()}%`);
    if (impact && impact.trim())
      filtered = filtered.ilike("impact", `%${impact.trim()}%`);
    if (teachings && teachings.trim())
      filtered = filtered.ilike("teachings", `%${teachings.trim()}%`);
    return filtered;
  };

  // Start base query and apply text filters
  let baseQuery = applyTextFilters(supabase.from("project").select("*"));

  // If technology filters are present, enforce INTERSECTION (project must contain ALL provided technologies)
  if (Array.isArray(technologies) && technologies.length > 0) {
    // Step 1: Get project ids that have all requested technologies
    const { data: thpRows, error: thpError } = await supabase
      .from("technology_has_proyect")
      .select("proyect_id, technology_id")
      .in("technology_id", technologies);

    if (thpError) return { data: null, error: thpError };

    // Count distinct technology matches per project
    const projectIdToTechSet = new Map<string, Set<string>>();
    (thpRows || []).forEach((row: any) => {
      const set = projectIdToTechSet.get(row.proyect_id) || new Set<string>();
      set.add(row.technology_id);
      projectIdToTechSet.set(row.proyect_id, set);
    });

    const requiredCount = new Set(technologies).size;
    const matchingProjectIds = Array.from(projectIdToTechSet.entries())
      .filter(([, techSet]) => techSet.size === requiredCount)
      .map(([projectId]) => projectId);

    if (matchingProjectIds.length === 0) return { data: [], error: null };

    baseQuery = baseQuery.in("id", matchingProjectIds);
  }

  const { data, error } = await baseQuery;
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
          technologies: await Promise.all(
            project.technologies.map(async (technology) => ({
              ...technology,
              icon: technology.icon
                ? await getImageUrlOrThrow(supabase, technology.icon)
                : undefined,
            }))
          ),
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

  const technologies = await Promise.all(
    technology_has_proyect.map(async (thp: { technology: Technology }) => ({
      ...thp.technology,
      icon: thp.technology.icon
        ? await getImageUrlOrThrow(supabase, thp.technology.icon)
        : undefined,
    }))
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

export async function getProjectsCount() {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("project")
    .select("*", { count: "exact", head: true });

  if (error) return { data: null, error };

  return { data: count || 0, error: null };
}

export async function createProject(
  projectCreateDTO: ProjectCreateDTO,
  formData: FormData
) {
  const { technologies, ...restProjectCreateDTO } = projectCreateDTO;
  const supabase = await createClient();

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

  const newProjectId = uuidv4();

  const { data: imagesData, error: insertImagesError } =
    await insertProjectImages(supabase, newProjectId, formData);

  if (!imagesData || insertImagesError)
    return { data: null, error: insertImagesError };

  // Preparar el objeto para insertar
  const insertData = {
    id: newProjectId,
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
    await insertProjectImages(supabase, projectEntity.id, formData);

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

export async function deleteProject(id: string) {
  const supabase = await createClient();

  // find the project
  const { data: projectFind, error: findProjectError } = await supabase
    .from("project")
    .select("*")
    .eq("id", id)
    .single();

  if (findProjectError) return { data: null, error: findProjectError };

  const projectEntity = projectFind as Project;

  // delete the images
  if (projectEntity.mainImage)
    await supabase.storage
      .from("portfolio-maker")
      .remove([projectEntity.mainImage]);
  if (projectEntity.images && projectEntity.images.length > 0)
    await supabase.storage.from("portfolio-maker").remove(projectEntity.images);

  const { error } = await supabase.from("project").delete().eq("id", id);

  if (error) return { data: null, error };

  return { data: { message: "Proyecto eliminado con éxito" }, error: null };
}

// functions auxs

async function insertProjectImages(
  supabase: SupabaseClient<any, "public", any>,
  projectId: string,
  formData: FormData
) {
  // Procesar mainImage
  const mainImage = formData.get("mainImage") as File;
  let mainImagePath: string | null = null;
  if (mainImage) {
    mainImagePath = generateStorageFilePath(
      mainImage,
      `projects/${projectId}/mainImage`
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
            `projects/${projectId}/images`
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
      return { data: null, error: error as StorageError };
    }
  }
  return { data: { mainImage: mainImagePath, images: imagePaths } };
}
