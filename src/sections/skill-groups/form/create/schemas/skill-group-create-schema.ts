import { z } from "zod";
import { SkillCreate, skillCreateSchema } from "./skill-create-schema";

export interface SkillGroupCreate {
  name: string;
  icon?: File;
  skills: SkillCreate[];
}

export const skillGroupCreateSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre del grupo de habilidades no puede estar vacío",
  }),
  icon: z
    .instanceof(File, {
      message: "Por favor selecciona una imagen.",
    })
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "La imagen no debe exceder 5MB."
    )
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "El archivo debe ser una imagen."
    ),
  skills: z.array(skillCreateSchema).min(1, {
    message: "Mínimo debe de introducir una habilidad para este grupo",
  }),
});
