import { TechnologyCreate } from "@/sections/technologies/form/schemas/technology-create-schema";

export interface Technology {
  id: string;
  name: string;
  icon?: string;
  color: string;
}

export interface TechnologyCreateDTO {
  name: string;
}

export const convertTechnologyCreateDTO = (
  technology: Omit<TechnologyCreate, "icon">
): TechnologyCreateDTO => {
  return {
    ...technology,
  };
};
