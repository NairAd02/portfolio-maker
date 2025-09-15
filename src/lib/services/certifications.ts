"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";
import { Certification, CertificationCreateDTO } from "../types/certifications";
import { getLoggedUser } from "./auth";
import { getImageUrlOrThrow, uploadFileToSupabase } from "./supabase-storage";
import { generateStorageFilePath } from "../images";

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

export async function createCertification(
  certificationCreateDTO: CertificationCreateDTO,
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

  // insert the image
  const { data: imageUploadData, error: imageUploadError } =
    await insertCertificationImage(
      supabase,
      formData,
      certificationCreateDTO.title
    );

  if (imageUploadError) return { data: null, error: imageUploadError };

  const { data: createCertificationData, error: createCertificationError } =
    await supabase
      .from("certification")
      .insert({
        ...certificationCreateDTO,
        image: imageUploadData,
        portfolio_id: portfolio.id,
      })
      .select()
      .single();

  if (createCertificationError)
    return { data: null, error: createCertificationError };

  return { data: createCertificationData, error: null };
}

// aux functions
async function insertCertificationImage(
  supabase: SupabaseClient<any, "public", any>,
  formData: FormData,
  certificationName: string
) {
  const image = formData.get("image") as File;
  if (!image) return { data: null, error: null };

  const imagePath = generateStorageFilePath(
    image,
    `certifications/${certificationName}/image`
  );

  const uploadImageError = await uploadFileToSupabase(
    supabase,
    "portfolio-maker",
    imagePath,
    image,
    "3600",
    false
  );
  if (uploadImageError) return { data: null, error: uploadImageError };

  return { data: imagePath, error: null };
}
