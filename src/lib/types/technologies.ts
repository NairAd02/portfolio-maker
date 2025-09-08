import { TechnologyCreate } from "@/sections/technologies/form/create/schemas/technology-create-schema";
import { TechnologyEdit } from "@/sections/technologies/form/edit/schemas/technology-edit-schema";

export interface Technology {
  id: string;
  name: string;
  icon?: string;
  color: string;
}

export interface TechnologyCreateDTO {
  name: string;
}

export interface TechnologyEditDTO {
  name: string;
}

export const convertTechnologyCreateDTO = (
  technology: Omit<TechnologyCreate, "icon">
): TechnologyCreateDTO => {
  return {
    ...technology,
  };
};

export const convertTechnologyEditDTO = (
  technology: Omit<TechnologyEdit, "icon">
): TechnologyEditDTO => {
  return {
    ...technology,
  };
};
