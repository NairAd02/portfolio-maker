import { ProjectCreate } from "@/sections/projects/form/new/schemas/project-create-schema";
import { Technology } from "./technologies";

export interface Project {
  id: string;
  name: string;
  description: string;
  mainImage?: string;
  sourceCodeUrl?: string;
  deploymentUrl?: string;
  images: string[];
  problem: string;
  solution: string;
  impact: string;
  teachings: string;
  technologies: Technology[];
}

export interface ProjectCreateDTO {
  name: string;
  description: string;
  mainImage?: string;
  sourceCodeUrl?: string;
  deploymentUrl?: string;
  images: string[];
  problem: string;
  solution: string;
  impact: string;
  teachings: string;
  technologies: string[];
}

export const convertProjectCreateDTO = (
  projectCreate: Omit<ProjectCreate, "images" | "mainImage">
): ProjectCreateDTO => {
  return {
    ...projectCreate,
    images: [],
  };
};
