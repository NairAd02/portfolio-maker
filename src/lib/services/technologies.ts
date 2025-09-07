"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";
import { Technology, TechnologyCreateDTO } from "../types/technologies";
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

  const icon = formData.get("icon") as File;

  const iconPath = generateStorageFilePath(
    icon,
    `technologies/${technologyDTO.name}/icon`
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

  const { data: createTechnologyData, error: createTechnologyError } =
    await supabase
      .from("technology")
      .insert({
        ...technologyDTO,
        icon: iconPath,
        portfolio_id: portfolio.id,
      })
      .select()
      .single();

  if (createTechnologyError)
    return { data: null, error: createTechnologyError };

  return { data: createTechnologyData, error: null };
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
