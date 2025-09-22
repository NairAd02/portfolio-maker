import { PersonalInformationSchema } from "@/sections/general-data/personal-information/form/schemas/personal-information-schema";
import { ProjectsSectionSchema } from "@/sections/general-data/projects-section/form/schemas/projects-section-schema";

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

// Experiences Section Report
export interface ExperiencesSectionReport {
  portfolioId: string;
  work_experience_text: string;
  experiencesCount: number;
}

export interface ProjectsSectionDTO {
  feature_project_text: string;
}

export const convertProjectsSectionDTO = (
  projectsSection: ProjectsSectionSchema
): ProjectsSectionDTO => {
  return {
    ...projectsSection,
  };
};

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
