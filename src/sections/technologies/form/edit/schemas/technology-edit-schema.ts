import { z } from "zod";

export interface TechnologyEdit {
  name: string;
  icon?: File;
}

export const technologyEditSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre de la tecnología no puede estar vacío" }),

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
