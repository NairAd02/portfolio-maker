import { PersonalInformationSchema } from "@/sections/general-data/personal-information-section/form/schemas/personal-information-schema";

export interface Portfolio {
  id: string;
  contact_name: string;
  contact_image: string;
  introductory_phrase: string;
  about_text: string;
  feature_projecttext: string;
  work_experiencetext: string;
  technologies_and_skills_text: string;
  education_and_certifications_text: string;
  blog_and_post_text: string;
  contact_text: string;
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
