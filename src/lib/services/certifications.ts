"use server";

import { createClient } from "../supabase/server";
import { Certification } from "../types/certifications";
import { getImageUrlOrThrow } from "./supabase-storage";

export async function getCertificationsList() {
  const supabase = await createClient();
  const { data: certificationsData, error } = await supabase
    .from("certification")
    .select("*");
  const certifications = certificationsData as Certification[];

  try {
    const certificationsMapped = await Promise.all(
      certifications.map(async (certification) => {
        return {
          ...certification,
          image: certification.image
            ? await getImageUrlOrThrow(supabase, certification.image)
            : undefined,
        } as Certification;
      })
    );
    return { data: certificationsMapped, error };
  } catch (error) {
    return { data: null, error };
  }
}
