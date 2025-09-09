"use server";
import { createClient } from "../supabase/server";
import { Experience } from "../types/experiences";
import { getImageUrlOrThrow } from "./supabase-storage";

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
