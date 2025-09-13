import { SkillGroupCreate } from "@/sections/skill-groups/form/create/schemas/skill-group-create-schema";

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

export interface Skill {
  name: string;
  level: LevelEnum;
  icon?: string;
}

export interface SkillCreateDTO {
  name: string;
  level: LevelEnum;
  icon?: string;
}

export interface SkillEditDTO {
  name: string;
  level: LevelEnum;
  icon?: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  icon?: string;
  skills: Skill[];
}

export interface SkillGroupDetails {
  id: string;
  name: string;
  icon?: string;
  skills: Skill[];
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
    skills: skillGroupCreate.skills.map((skill) => ({
      ...skill,
      icon: skill.icon ? skill.icon.name : undefined,
    })),
  };
};

export const convertSkillGroupEditDTO = (
  skillGroupCreate: Omit<SkillGroupCreate, "icon">
): SkillGroupCreateDTO => {
  return {
    ...skillGroupCreate,
    skills: skillGroupCreate.skills.map((skill) => ({
      ...skill,
      icon: skill.icon ? skill.icon.name : undefined,
    })),
  };
};
