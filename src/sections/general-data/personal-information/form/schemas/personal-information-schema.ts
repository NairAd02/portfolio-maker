import { z } from "zod";

export interface PersonalInformationSchema {
  contact_name: string;
  introductory_phrase: string;
  contact_image?: File;
}

export const personalInformationSchema = z.object({
  contact_name: z.string().min(1, { message: "El campo es obligatorio" }),
  introductory_phrase: z
    .string()
    .min(1, { message: "El campo es obligatorio" }),
  contact_image: z
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
