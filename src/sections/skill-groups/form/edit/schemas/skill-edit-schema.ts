import { LevelEnum } from "@/lib/types/skill-groups";
import { z } from "zod";

export interface SkillEdit {
  name: string;
  level: LevelEnum;
  icon?: File;
}

export const skillEditSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre de la habilidad no puede estar vacío",
  }),
  level: z.enum([LevelEnum.ADVANCED, LevelEnum.INTERMEDIATE, LevelEnum.BASIC]),
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
});
