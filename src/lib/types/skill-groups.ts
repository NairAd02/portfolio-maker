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

interface Skill {
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
