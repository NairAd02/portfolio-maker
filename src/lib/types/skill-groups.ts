import { SkillGroupCreate } from "@/sections/skill-groups/form/create/schemas/skill-group-create-schema";
import { Technology } from "./technologies";

export enum LevelEnum {
  BASIC = "basic",
  ADVANCED = "avanzado",
  INTERMEDIATE = "intermedio",
}

export const levelMap: Map<
  LevelEnum,
  {
    name: string;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
  }
> = new Map([
  [LevelEnum.ADVANCED, { name: "Avanzado", color: "secondary" }],
  [LevelEnum.INTERMEDIATE, { name: "Intermedio", color: "secondary" }],
  [LevelEnum.BASIC, { name: "Básico", color: "secondary" }],
]);

// Función para obtener el color del nivel
export const getLevelColor = (level: LevelEnum): string => {
  switch (level) {
    case LevelEnum.BASIC:
      return "bg-red-100 text-red-800 border-red-200";
    case LevelEnum.INTERMEDIATE:
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-primary text-white";
  }
};

// Función para obtener el número de estrellas según el nivel
export const getLevelStars = (level: LevelEnum): number => {
  switch (level) {
    case LevelEnum.BASIC:
      return 1;
    case LevelEnum.INTERMEDIATE:
      return 2;
    default:
      return 3;
  }
};

// Función para obtener el texto del nivel en español
export const getLevelText = (level: LevelEnum): string => {
  switch (level) {
    case LevelEnum.BASIC:
      return "Básico";
    case LevelEnum.INTERMEDIATE:
      return "Intermedio";
    default:
      return "Avanzado";
  }
};

export interface Skill {
  name: string;
}

export interface SkillCreateDTO {
  name: string;
}

export interface SkillEditDTO {
  name: string;
}

export interface MasteredTechnology {
  technology: Technology;
  level: LevelEnum;
}

export interface SkillGroup {
  id: string;
  name: string;
  icon?: string;
  skills: Skill[];
  masteredTechnologies: MasteredTechnology[];
}

export interface SkillGroupDetails {
  id: string;
  name: string;
  icon?: string;
  skills: Skill[];
  masteredTechnologies: MasteredTechnology[];
}

export interface SkillGroupCreateDTO {
  name: string;
  icon?: string;
  skills: SkillCreateDTO[];
}

export interface SkillGroupEditDTO {
  name: string;
  icon?: string;
  skills: SkillEditDTO[];
}

export const convertSkillGroupCreateDTO = (
  skillGroupCreate: Omit<SkillGroupCreate, "icon">
): SkillGroupCreateDTO => {
  return {
    ...skillGroupCreate,
  };
};

export const convertSkillGroupEditDTO = (
  skillGroupCreate: Omit<SkillGroupCreate, "icon">
): SkillGroupCreateDTO => {
  return {
    ...skillGroupCreate,
  };
};
