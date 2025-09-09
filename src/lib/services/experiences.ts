"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";
import { Experience, ExperienceCreateDTO } from "../types/experiences";
import { getImageUrlOrThrow, uploadFileToSupabase } from "./supabase-storage";
import { generateStorageFilePath } from "../images";
import { insertExperienceTechnologies } from "./technologies";
import { getLoggedUser } from "./auth";

export async function getExperiencesList() {
  const supabase = await createClient();
  const { data: experiencesData, error } = await supabase
    .from("experience")
    .select("*");
  const experiences = experiencesData as Experience[];

  try {
    const experiencesMapped = await Promise.all(
      experiences.map(async (experience) => {
        return {
          ...experience,
          mainImage: experience.mainImage
            ? await getImageUrlOrThrow(supabase, experience.mainImage)
            : undefined,
        };
      })
    );
    return { data: experiencesMapped, error };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createExperience(
  experienceCreateDTO: ExperienceCreateDTO,
  formData: FormData
) {
  const { technologies, ...restExperienceCreateDTO } = experienceCreateDTO;
  const supabase = await createClient();

  // get the session
  const { data: sessionData, error: loggedUserError } = await getLoggedUser();

  if (!sessionData || loggedUserError) return { data: null, loggedUserError };

  // find the user portfolio
  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select("id")
    .eq("user_id", sessionData.user.id)
    .single();

  if (portfolioError) return { data: null, error: portfolioError };

  // insert the main image
  const { data: mainImageUploadData, error: mainImageUploadError } =
    await insertExperienceMainImage(
      supabase,
      formData,
      experienceCreateDTO.company
    );

  if (mainImageUploadError) return { data: null, error: mainImageUploadError };

  const { data: createExperienceData, error: createExperienceError } =
    await supabase
      .from("experience")
      .insert({
        ...restExperienceCreateDTO,
        mainImage: mainImageUploadData,
        portfolio_id: portfolio.id,
      })
      .select()
      .single();

  if (createExperienceError)
    return { data: null, error: createExperienceError };

  // Insertar tecnologías relacionadas
  if (technologies && technologies.length > 0) {
    const { error: technologiesError } = await insertExperienceTechnologies(
      supabase,
      createExperienceData.id,
      technologies
    );

    if (technologiesError) return { data: null, error: technologiesError };
  }

  return { data: createExperienceData, error: null };
}

// aux functions
async function insertExperienceMainImage(
  supabase: SupabaseClient<any, "public", any>,
  formData: FormData,
  experienceName: string
) {
  const icon = formData.get("icon") as File;
  if (!icon) return { data: null, error: null };

  const iconPath = generateStorageFilePath(
    icon,
    `experiences/${experienceName}/mainImage`
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
