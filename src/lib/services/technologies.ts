"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";
import {
  Technology,
  TechnologyCreateDTO,
  TechnologyDetails,
  TechnologyEditDTO,
} from "../types/technologies";
import { getLoggedUser } from "./auth";
import { generateStorageFilePath } from "../images";
import { getImageUrlOrThrow, uploadFileToSupabase } from "./supabase-storage";

export async function getTechnologiesList() {
  const supabase = await createClient();
  const { data: technologiesData, error } = await supabase
    .from("technology")
    .select("*");
  const technologies = technologiesData as Technology[];

  try {
    const technologiesMapped = await Promise.all(
      technologies.map(async (technology) => {
        return {
          ...technology,
          icon: technology.icon
            ? await getImageUrlOrThrow(supabase, technology.icon)
            : undefined,
        };
      })
    );
    return { data: technologiesMapped, error };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getTechnologyById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("technology")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return { data: null, error };

  const technology = data as TechnologyDetails;

  return {
    data: {
      ...technology,
      icon: technology.icon
        ? await getImageUrlOrThrow(supabase, technology.icon)
        : undefined,
    },
    error: null,
  };
}

export async function createTechnology(
  technologyDTO: TechnologyCreateDTO,
  formData: FormData
) {
  const supabase = await createClient();

  // get the session
  const { data: sessionData, error: loggedUserError } = await getLoggedUser();

  if (!sessionData || loggedUserError) return { data: null, loggedUserError };

  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select("id")
    .eq("user_id", sessionData.user.id)
    .single();

  if (portfolioError) return { data: null, error: portfolioError };

  // insert the icon
  const { data: iconUploadData, error: iconUploadError } =
    await insertTechnologyIcon(supabase, formData, technologyDTO.name);

  if (iconUploadError) return { data: null, error: iconUploadError };

  const { data: createTechnologyData, error: createTechnologyError } =
    await supabase
      .from("technology")
      .insert({
        ...technologyDTO,
        icon: iconUploadData,
        portfolio_id: portfolio.id,
      })
      .select()
      .single();

  if (createTechnologyError)
    return { data: null, error: createTechnologyError };

  return { data: createTechnologyData, error: null };
}

export async function editTechnology(
  id: string,
  technologyEditDTO: TechnologyEditDTO,
  formData: FormData
) {
  const supabase = await createClient();

  // find the technology to edit
  const { data: technologyFind, error: technologyFindError } = await supabase
    .from("technology")
    .select("*")
    .eq("id", id)
    .single();

  if (technologyFindError) return { data: null, error: technologyFindError };

  const technologyEntity = technologyFind as Technology;

  // delete the icon
  if (technologyEntity.icon)
    await supabase.storage
      .from("portfolio-maker")
      .remove([technologyEntity.icon]);

  // insert the icon
  const { data: iconUploadData, error: iconUploadError } =
    await insertTechnologyIcon(supabase, formData, technologyEditDTO.name);

  if (iconUploadError) return { data: null, error: iconUploadError };

  const { data: updateTechnologyData, error: updateTechnologyError } =
    await supabase
      .from("technology")
      .update({
        ...technologyEditDTO,
        icon: iconUploadData,
      })
      .eq("id", id)
      .select()
      .single();
  if (updateTechnologyError)
    return { data: null, error: updateTechnologyError };

  return { data: updateTechnologyData, error: null };
}

export async function insertProjectTechnologies(
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

export async function insertExperienceTechnologies(
  supabase: SupabaseClient<any, "public", any>,
  experienceId: string,
  technologies: string[]
) {
  const technologiesRelations = technologies.map((technology) => ({
    technology_id: technology,
    experience_id: experienceId,
  }));
  const { data, error: technologiesError } = await supabase
    .from("experience_has_technology")
    .insert(technologiesRelations)
    .select()
    .single();
  if (technologiesError) return { data: null, error: technologiesError };

  return { data, error: null };
}

export async function deleteTechnology(id: string) {
  const supabase = await createClient();

  // find the technology to edit
  const { data: technologyFind, error: technologyFindError } = await supabase
    .from("technology")
    .select("*")
    .eq("id", id)
    .single();

  if (technologyFindError) return { data: null, error: technologyFindError };

  const technologyEntity = technologyFind as Technology;

  // delete the icon
  if (technologyEntity.icon)
    await supabase.storage
      .from("portfolio-maker")
      .remove([technologyEntity.icon]);

  const { error } = await supabase.from("technology").delete().eq("id", id);

  if (error) return { data: null, error };

  return { data: { message: "Tecnología eliminada con éxito" }, error: null };
}

// aux functions
async function insertTechnologyIcon(
  supabase: SupabaseClient<any, "public", any>,
  formData: FormData,
  technologyName: string
) {
  const icon = formData.get("icon") as File;
  if (!icon) return { data: null, error: null };

  const iconPath = generateStorageFilePath(
    icon,
    `technologies/${technologyName}/icon`
  );

  const uploadIconError = await uploadFileToSupabase(
    supabase,
    "portfolio-maker",
    iconPath,
    icon,
    "3600",
    false
  );
  if (uploadIconError) return { data: null, error: uploadIconError };

  return { data: iconPath, error: null };
}
