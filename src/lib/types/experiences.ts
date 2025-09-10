import { ExperienceCreate } from "@/sections/experiences/form/create/schemas/experience-create-schema";
import { Technology } from "./technologies";
import { ExperienceEdit } from "@/sections/experiences/form/edit/schemas/experience-edit-schema";

export interface Experience {
  id: string;
  company: string;
  position: string;
  startdate: string;
  enddate: string;
  description: string;
  mainImage?: string;
}

export interface ExperienceDetails {
  id: string;
  company: string;
  position: string;
  startdate: string;
  enddate: string;
  description: string;
  mainImage: string;
  achievements: string[];
  technologies: Technology[];
}

export interface ExperienceCreateDTO {
  company: string;
  position: string;
  startdate: string;
  enddate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ExperienceEditDTO {
  company: string;
  position: string;
  startdate: string;
  enddate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const convertExperienceCreateDTO = (
  experience: Omit<ExperienceCreate, "mainImage">
): ExperienceCreateDTO => {
  return {
    ...experience,
    achievements: experience.achievements.map(
      (achievement) => achievement.name
    ),
    startdate: experience.startdate.toISOString(),
    enddate: experience.enddate.toISOString(),
  };
};

export const convertExperienceEditDTO = (
  experience: Omit<ExperienceEdit, "mainImage">
): ExperienceEditDTO => {
  return {
    ...experience,
    achievements: experience.achievements.map(
      (achievement) => achievement.name
    ),
    startdate: experience.startdate.toISOString(),
    enddate: experience.enddate.toISOString(),
  };
};
