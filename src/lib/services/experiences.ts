"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";
import {
  Experience,
  ExperienceCreateDTO,
  ExperienceDetails,
  ExperienceEditDTO,
} from "../types/experiences";
import { getImageUrlOrThrow, uploadFileToSupabase } from "./supabase-storage";
import { generateStorageFilePath } from "../images";
import { insertExperienceTechnologies } from "./technologies";
import { getLoggedUser } from "./auth";
import { Technology } from "../types/technologies";
import { v4 as uuidv4 } from "uuid";

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
export async function getExperienceById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experience")
    .select(
      `
      *,
      experience_has_technology (
        technology (*)
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) return { data: null, error };

  const { experience_has_technology, ...rest } = data;

  const technologies = experience_has_technology.map(
    (thp: { technology: Technology }) => thp.technology
  );

  return {
    data: {
      ...rest,
      technologies,
      mainImage: data.mainImage
        ? await getImageUrlOrThrow(supabase, data.mainImage)
        : undefined,
    } as ExperienceDetails,
    error: null,
  };
}

export async function getExperiencesCount() {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("experience")
    .select("*", { count: "exact", head: true });

  if (error) return { data: null, error };

  return { data: count || 0, error: null };
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

  const newExperienceId = uuidv4();

  // insert the main image
  const { data: mainImageUploadData, error: mainImageUploadError } =
    await insertExperienceMainImage(supabase, formData, newExperienceId);

  if (mainImageUploadError) return { data: null, error: mainImageUploadError };

  const { data: createExperienceData, error: createExperienceError } =
    await supabase
      .from("experience")
      .insert({
        id: newExperienceId,
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

export async function editExperience(
  id: string,
  experienceEditDTO: ExperienceEditDTO,
  formData: FormData
) {
  const { technologies, ...restExperienceEditDTO } = experienceEditDTO;
  const supabase = await createClient();

  // find the technology to edit
  const { data: experienceFind, error: experienceFindError } = await supabase
    .from("experience")
    .select("*")
    .eq("id", id)
    .single();

  if (experienceFindError) return { data: null, error: experienceFindError };

  const experienceEntity = experienceFind as ExperienceDetails;

  // delete the mainImage
  if (experienceEntity.mainImage)
    await supabase.storage
      .from("portfolio-maker")
      .remove([experienceEntity.mainImage]);

  // insert the mainImage
  const { data: mainImageUploadData, error: mainImageUploadError } =
    await insertExperienceMainImage(supabase, formData, experienceEntity.id);

  if (mainImageUploadError) return { data: null, error: mainImageUploadError };

  const { data: updateExperienceData, error: updateExperienceError } =
    await supabase
      .from("experience")
      .update({
        ...restExperienceEditDTO,
        mainImage: mainImageUploadData,
      })
      .eq("id", id)
      .select()
      .single();

  if (updateExperienceError)
    return { data: null, error: updateExperienceError };

  // update the technologies

  // first delete current technologies
  const { error: deleteTechnologiesError } = await supabase
    .from("experience_has_technology")
    .delete()
    .eq("experience_id", id);

  if (deleteTechnologiesError)
    return { data: null, error: deleteTechnologiesError };

  // insert new technologies
  if (technologies.length > 0) {
    const { error: insertTechnologiesError } =
      await insertExperienceTechnologies(supabase, id, technologies);
    if (insertTechnologiesError)
      return { data: null, error: insertTechnologiesError };
  }

  return { data: updateExperienceData, error: null };
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();

  // find the experience to edit
  const { data: experienceFind, error: experienceFindError } = await supabase
    .from("experience")
    .select("*")
    .eq("id", id)
    .single();

  if (experienceFindError) return { data: null, error: experienceFindError };

  const experienceEntity = experienceFind as Experience;

  // delete the mainImage
  if (experienceEntity.mainImage)
    await supabase.storage
      .from("portfolio-maker")
      .remove([experienceEntity.mainImage]);

  const { error } = await supabase.from("experience").delete().eq("id", id);

  if (error) return { data: null, error };

  return {
    data: { message: "Experiencia laboral eliminada con éxito" },
    error: null,
  };
}

// aux functions
async function insertExperienceMainImage(
  supabase: SupabaseClient<any, "public", any>,
  formData: FormData,
  experienceId: string
) {
  const mainImage = formData.get("mainImage") as File;
  if (!mainImage) return { data: null, error: null };

  const iconPath = generateStorageFilePath(
    mainImage,
    `experiences/${experienceId}/mainImage`
  );

  const uploadIconError = await uploadFileToSupabase(
    supabase,
    "portfolio-maker",
    iconPath,
    mainImage,
    "3600",
    false
  );
  if (uploadIconError) return { data: null, error: uploadIconError };

  return { data: iconPath, error: null };
}
