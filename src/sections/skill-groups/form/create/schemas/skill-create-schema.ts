import { z } from "zod";

export interface SkillCreate {
  name: string;
}

export const skillCreateSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre de la habilidad no puede estar vacío",
  }),
});
