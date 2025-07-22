"use server";

import { generateStorageFilePath } from "../images";
import { createClient } from "../supabase/server";
import { Project, ProjectCreateDTO } from "../types/projects";

export async function getProjectsList() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase.from("project").select("*");
  console.log(projects);
  return { data: projects, error };
}

export async function createProject(
  projectCreateDTO: ProjectCreateDTO,
  formData: FormData
) {
  const { technologies, ...restProjectCreateDTO } = projectCreateDTO;
  const supabase = await createClient();
  // insert the files of project
  // insert the mainImage
  const mainImage = formData.get("mainImage") as File;

  restProjectCreateDTO.mainImage = generateStorageFilePath(
    mainImage,
    "portfolio-maker/projects"
  );

  const { error: uploadMainImageError } = await supabase.storage
    .from("portfolio-maker") // bucket name
    .upload(restProjectCreateDTO.mainImage, mainImage, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadMainImageError) return { data: null, error: uploadMainImageError };

  // insert the images
  const images = formData.getAll("images") as File[];

  await Promise.all(
    images.map(async (image) => {
      const imagePath = generateStorageFilePath(
        image,
        "portfolio-maker/projects/" + restProjectCreateDTO.name
      );

      restProjectCreateDTO.images.push(imagePath);

      const { error: uploadImageError } = await supabase.storage
        .from("portfolio-maker") // bucket name
        .upload(imagePath, image, {
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadImageError) return { data: null, error: uploadImageError };
    })
  );

  const { data, error: projectError } = await supabase
    .from("project")
    .insert(restProjectCreateDTO)
    .select()
    .single();

  if (projectError) return { data: null, error: projectError };

  const projectEntity = data as Project;

  // insert the technologies
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

  return { data: projectEntity, error: null };
}
