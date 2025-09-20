"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { generateStorageFilePath } from "../images";
import { createClient } from "../supabase/server";
import {
  PersonalInformationDTO,
  PersonalInformationReport,
  Portfolio,
} from "../types/portfolio";
import { getImageUrlOrThrow, uploadFileToSupabase } from "./supabase-storage";
import { getLoggedUser } from "./auth";

export async function getPersonalInformationReport() {
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

  const portfolioEntity = portfolio as Portfolio;

  return {
    data: {
      portfolioId: portfolioEntity.id,
      contact_name: portfolioEntity.contact_name,
      contact_image: portfolioEntity.contact_image
        ? await getImageUrlOrThrow(supabase, portfolioEntity.contact_image)
        : undefined,
      introductory_phrase: portfolioEntity.introductory_phrase,
    } as PersonalInformationReport,
  };
}

export async function editPersonalInformation(
  personalInformationDTO: PersonalInformationDTO,
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

  const portfolioEntity = portfolio as Portfolio;

  // delete the contact image
  if (portfolioEntity.contact_image)
    await supabase.storage
      .from("portfolio-maker")
      .remove([portfolioEntity.contact_image]);

  // insert the contact image
  const { data: contactImageUploadData, error: contactImageUploadError } =
    await insertPortfolioContactImage(supabase, formData, portfolioEntity.id);

  if (contactImageUploadError)
    return { data: null, error: contactImageUploadError };

  const { data: updatePortfolioData, error: updatePortfolioError } =
    await supabase
      .from("portfolio")
      .update({
        ...personalInformationDTO,
        contact_image: contactImageUploadData,
      })
      .eq("id", portfolioEntity.id)
      .select()
      .single();
  if (updatePortfolioError) return { data: null, error: updatePortfolioError };

  return { data: updatePortfolioData, error: null };
}

// aux functions
async function insertPortfolioContactImage(
  supabase: SupabaseClient<any, "public", any>,
  formData: FormData,
  portfolioId: string
) {
  const contact_image = formData.get("contact_image") as File;
  if (!contact_image) return { data: null, error: null };

  const contactImagePath = generateStorageFilePath(
    contact_image,
    `portfolios/${portfolioId}/contact_image`
  );

  const uploadContactImageError = await uploadFileToSupabase(
    supabase,
    "portfolio-maker",
    contactImagePath,
    contact_image,
    "3600",
    false
  );
  if (uploadContactImageError)
    return { data: null, error: uploadContactImageError };

  return { data: contactImagePath, error: null };
}
