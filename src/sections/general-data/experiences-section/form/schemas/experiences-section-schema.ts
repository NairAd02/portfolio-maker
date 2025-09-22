import { z } from "zod";

export interface ExperiencesSectionSchema {
  work_experience_text: string;
}

export const experiencesSectionSchema = z.object({
  work_experience_text: z
    .string()
    .min(1, { message: "El campo es obligatorio" }),
});
