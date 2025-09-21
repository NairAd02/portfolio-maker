import { PersonalInformationSchema } from "@/sections/general-data/personal-information/form/schemas/personal-information-schema";

export interface Portfolio {
  id: string;
  contact_name: string;
  contact_image?: string;
  introductory_phrase: string;
  about_text: string;
  feature_project_text: string;
  work_experience_text: string;
  technologies_and_skills_text: string;
  education_and_certifications_text: string;
  blog_and_post_text: string;
  contact_text: string;
}

// PersonalInformationReport
export interface PersonalInformationReport {
  portfolioId: string;
  contact_name: string;
  contact_image?: string;
  introductory_phrase: string;
}

// Projects Section Report
export interface ProjectsSectionReport {
  portfolioId: string;
  feature_project_text: string;
  projectsCount: number;
}

export interface PersonalInformationDTO {
  contact_name: string;
  introductory_phrase: string;
}

export const convertPersonalInformationDTO = (
  personalInformation: Omit<PersonalInformationSchema, "contact_image">
): PersonalInformationDTO => {
  return {
    ...personalInformation,
  };
};
