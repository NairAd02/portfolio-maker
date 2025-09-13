import { z } from "zod";
import { SkillEdit, skillEditSchema } from "./skill-edit-schema";

export interface SkillGroupEdit {
  name: string;
  icon?: File;
  skills: SkillEdit[];
}

export const skillGroupEditSchema = z.object({
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
  skills: z.array(skillEditSchema).min(1, {
    message: "Mínimo debe de introducir una habilidad para este grupo",
  }),
});
