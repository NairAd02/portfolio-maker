"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { generateStorageFilePath } from "../images";
import { createClient } from "../supabase/server";
import {
  ExperiencesSectionDTO,
  ExperiencesSectionReport,
  PersonalInformationDTO,
  PersonalInformationReport,
  Portfolio,
  ProjectsSectionDTO,
  ProjectsSectionReport,
  SkillsSectionReport,
} from "../types/portfolio";
import { getImageUrlOrThrow, uploadFileToSupabase } from "./supabase-storage";
import { getLoggedUser } from "./auth";
import { getProjectsCount } from "./projects";
import { getExperiencesCount } from "./experiences";
import { getSkillsAndSkillGroupsCount } from "./skill-groups";

export async function getPersonalInformationReport() {
  const supabase = await createClient();

  // get the session
  const { data: sessionData, error: loggedUserError } = await getLoggedUser();

  if (!sessionData || loggedUserError) return { data: null, loggedUserError };

  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select("*")
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

export async function getProjectsSectionReport() {
  const supabase = await createClient();

  // get the session
  const { data: sessionData, error: loggedUserError } = await getLoggedUser();

  if (!sessionData || loggedUserError) return { data: null, loggedUserError };

  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select("*")
    .eq("user_id", sessionData.user.id)
    .single();

  if (portfolioError) return { data: null, error: portfolioError };

  const portfolioEntity = portfolio as Portfolio;

  // get projects count
  const { data: projectsCountData, error: projectsCountError } =
    await getProjectsCount();

  if (projectsCountError) return { data: null, error: projectsCountError };

  return {
    data: {
      portfolioId: portfolioEntity.id,
      feature_project_text: portfolioEntity.feature_project_text,
      projectsCount: projectsCountData,
    } as ProjectsSectionReport,
  };
}

export async function getExperiencesSectionReport() {
  const supabase = await createClient();

  // get the session
  const { data: sessionData, error: loggedUserError } = await getLoggedUser();

  if (!sessionData || loggedUserError) return { data: null, loggedUserError };

  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select("*")
    .eq("user_id", sessionData.user.id)
    .single();

  if (portfolioError) return { data: null, error: portfolioError };

  const portfolioEntity = portfolio as Portfolio;

  // get experiences count
  const { data: experiencesCountData, error: experiencesCountError } =
    await getExperiencesCount();

  if (experiencesCountError)
    return { data: null, error: experiencesCountError };

  return {
    data: {
      portfolioId: portfolioEntity.id,
      work_experience_text: portfolioEntity.work_experience_text,
      experiencesCount: experiencesCountData,
    } as ExperiencesSectionReport,
  };
}

export async function getSkillsSectionReport() {
  const supabase = await createClient();

  // get the session
  const { data: sessionData, error: loggedUserError } = await getLoggedUser();

  if (!sessionData || loggedUserError) return { data: null, loggedUserError };

  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select("*")
    .eq("user_id", sessionData.user.id)
    .single();

  if (portfolioError) return { data: null, error: portfolioError };

  const portfolioEntity = portfolio as Portfolio;

  // get skills and skillGroups count
  const {
    data: skillsAndSkillGroupsCountData,
    error: skillsAndSkillGroupsError,
  } = await getSkillsAndSkillGroupsCount();

  if (skillsAndSkillGroupsError)
    return { data: null, error: skillsAndSkillGroupsError };

  return {
    data: {
      portfolioId: portfolioEntity.id,
      technologies_and_skills_text:
        portfolioEntity.technologies_and_skills_text,
      skillGroupsCount: skillsAndSkillGroupsCountData.skillGroupsCount,
      skillsCount: skillsAndSkillGroupsCountData.skillsCount,
    } as SkillsSectionReport,
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

export async function editProjectsSection(
  projectsSectionDTO: ProjectsSectionDTO
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

  const { data: updatePortfolioData, error: updatePortfolioError } =
    await supabase
      .from("portfolio")
      .update({
        ...projectsSectionDTO,
      })
      .eq("id", portfolioEntity.id)
      .select()
      .single();
  if (updatePortfolioError) return { data: null, error: updatePortfolioError };

  return { data: updatePortfolioData, error: null };
}

export async function editExperiencesSection(
  experiencesSectionDTO: ExperiencesSectionDTO
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

  const { data: updatePortfolioData, error: updatePortfolioError } =
    await supabase
      .from("portfolio")
      .update({
        ...experiencesSectionDTO,
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
