import { ProjectCreate } from "@/sections/projects/form/new/schemas/project-create-schema";
import { Technology } from "./technologies";
import { ProjectEdit } from "@/sections/projects/form/edit/schemas/project-edit-schema";

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

export interface ProjectDetails {
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
  portfolio_id: string;
  technologies: string[];
}

export interface ProjectEditDTO {
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
    sourceCodeUrl: projectCreate.sourceCodeUrl || undefined,
    deploymentUrl: projectCreate.deploymentUrl || undefined,
    portfolio_id: "",
  };
};

export const convertProjectEditDTO = (
  projectEdit: Omit<ProjectEdit, "images" | "mainImage">
): ProjectEditDTO => {
  return {
    ...projectEdit,
    images: [],
    sourceCodeUrl: projectEdit.sourceCodeUrl || undefined,
    deploymentUrl: projectEdit.deploymentUrl || undefined,
  };
};
