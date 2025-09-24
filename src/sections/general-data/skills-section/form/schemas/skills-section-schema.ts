import { z } from "zod";

export interface SkillsSectionSchema {
  technologies_and_skills_text: string;
}

export const skillsSectionSchema = z.object({
  technologies_and_skills_text: z
    .string()
    .min(1, { message: "El campo es obligatorio" }),
});
