import { z } from "zod";

export interface SkillEdit {
  name: string;
}

export const skillEditSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre de la habilidad no puede estar vacío",
  }),
});
