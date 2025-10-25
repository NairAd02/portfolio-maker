import { AboutSectionSchema } from "@/sections/general-data/about-section/form/schemas/about-section-schema";
import { BlogsSectionSchema } from "@/sections/general-data/blogs-section/form/schemas/blogs-section-schema";
import { CertificationsSectionSchema } from "@/sections/general-data/certifications-section/form/schemas/certifications-section-schema";
import { ContactSectionSchema } from "@/sections/general-data/contact-section/form/schemas/contact-section-schema";
import { ExperiencesSectionSchema } from "@/sections/general-data/experiences-section/form/schemas/experiences-section-schema";
import { PersonalInformationSchema } from "@/sections/general-data/personal-information/form/schemas/personal-information-schema";
import { ProjectsSectionSchema } from "@/sections/general-data/projects-section/form/schemas/projects-section-schema";
import { SkillsSectionSchema } from "@/sections/general-data/skills-section/form/schemas/skills-section-schema";

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
  contact_email: string;
  contact_phone: string;
  location: string;
  cv_doc?: string;
}

// PersonalInformationReport
export interface PersonalInformationReport {
  portfolioId: string;
  contact_name: string;
  contact_image?: string;
  introductory_phrase: string;
}

// Contact Section Report
export interface ContactSectionReport {
  portfolioId: string;
  contact_text: string;
  contact_email: string;
  contact_phone: string;
  location: string;
  cv_doc: string;
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

// Skills Section Report
export interface SkillsSectionReport {
  portfolioId: string;
  technologies_and_skills_text: string;
  skillsCount: number;
  skillGroupsCount: number;
}

// Certifications Section Report
export interface CertificationsSectionReport {
  portfolioId: string;
  education_and_certifications_text: string;
  certificationsCount: number;
  certificationGroupsCount: number;
}

// Blogs Section Report
export interface BlogsSectionReport {
  portfolioId: string;
  blog_and_post_text: string;
  blogsCount: number;
}

// About Section Report
export interface AboutSectionReport {
  portfolioId: string;
  about_text: string;
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

export interface ExperiencesSectionDTO {
  work_experience_text: string;
}

export const convertExperiencesSectionDTO = (
  experiencesSection: ExperiencesSectionSchema
): ExperiencesSectionDTO => {
  return {
    ...experiencesSection,
  };
};

export interface SkillsSectionDTO {
  technologies_and_skills_text: string;
}

export const convertSkillsSectionDTO = (
  skillsSection: SkillsSectionSchema
): SkillsSectionDTO => {
  return {
    ...skillsSection,
  };
};

export interface CertificationsSectionDTO {
  education_and_certifications_text: string;
}

export const convertCertificationsSectionDTO = (
  certificationsSection: CertificationsSectionSchema
): CertificationsSectionDTO => {
  return {
    ...certificationsSection,
  };
};

export interface BlogsSectionDTO {
  blog_and_post_text: string;
}

export const convertBlogsSectionDTO = (
  blogsSection: BlogsSectionSchema
): BlogsSectionDTO => {
  return {
    ...blogsSection,
  };
};

export interface AboutSectionDTO {
  about_text: string;
}

export const convertAboutSectionDTO = (
  aboutSection: AboutSectionSchema
): AboutSectionDTO => {
  return {
    ...aboutSection,
  };
};

export interface ContactSectionDTO {
  contact_text: string;
  contact_email: string;
}

export const convertContactSectionDTO = (
  contactSection: Omit<ContactSectionSchema, "cv_doc">
): ContactSectionDTO => {
  return {
    ...contactSection,
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
