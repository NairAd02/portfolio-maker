"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";
import {
  Certification,
  CertificationCreateDTO,
  CertificationDetails,
  CertificationEditDTO,
} from "../types/certifications";
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

export async function getCertificationById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certification")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return { data: null, error };

  const certification = data as CertificationDetails;

  return {
    data: {
      ...certification,
      image: certification.image
        ? await getImageUrlOrThrow(supabase, certification.image)
        : undefined,
    } as CertificationDetails,
    error: null,
  };
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

export async function editCertification(
  id: string,
  certificationEditDTO: CertificationEditDTO,
  formData: FormData
) {
  const supabase = await createClient();

  // find the certification to edit
  const { data: certificationFind, error: certificationFindError } =
    await supabase.from("certification").select("*").eq("id", id).single();

  if (certificationFindError)
    return { data: null, error: certificationFindError };

  const certification = certificationFind as Certification;

  // delete the image
  if (certification.image)
    await supabase.storage
      .from("portfolio-maker")
      .remove([certification.image]);

  // insert the icon
  const { data: imageUploadData, error: imageUploadError } =
    await insertCertificationImage(
      supabase,
      formData,
      certificationEditDTO.title
    );

  if (imageUploadError) return { data: null, error: imageUploadError };

  const { data: updateCertificationData, error: updateCertificationError } =
    await supabase
      .from("certification")
      .update({
        ...certificationEditDTO,
        image: imageUploadData,
      })
      .eq("id", id)
      .select()
      .single();
  if (updateCertificationError)
    return { data: null, error: updateCertificationError };

  return { data: updateCertificationData, error: null };
}

export async function deleteCertification(id: string) {
  const supabase = await createClient();

  // find the certification to edit
  const { data: certificationFind, error: certificationFindError } =
    await supabase.from("certification").select("*").eq("id", id).single();

  if (certificationFindError)
    return { data: null, error: certificationFindError };

  const certificationEntity = certificationFind as Certification;

  // delete the image
  if (certificationEntity.image)
    await supabase.storage
      .from("portfolio-maker")
      .remove([certificationEntity.image]);

  const { error } = await supabase.from("certification").delete().eq("id", id);

  if (error) return { data: null, error };

  return {
    data: { message: "Certificación eliminada con éxito" },
    error: null,
  };
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
