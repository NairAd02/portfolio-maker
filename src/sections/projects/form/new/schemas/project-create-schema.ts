import { z } from "zod";

export interface ProjectCreate {
  name: string;
  description: string;
  mainImage?: File;
  sourceCodeUrl: string;
  deploymentUrl: string;
  images: File[];
  problem: string;
  solution: string;
  impact: string;
  teachings: string;
  technologies: string[];
}

export const projectCreateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre del proyecto no puede estar vacío" }),
  description: z
    .string()
    .min(1, { message: "La descripción del proyecto es requerida" }),
  mainImage: z
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
  images: z
    .array(
      z
        .instanceof(File, {
          message: "Por favor selecciona una imagen.",
        })
        .refine(
          (file) => file && file.size <= 5 * 1024 * 1024,
          "La imagen no debe exceder 5MB."
        )
        .refine(
          (file) => file && file.type.startsWith("image/"),
          "El archivo debe ser una imagen."
        )
    )
    .min(1, { message: "Debes subir al menos una imagen." }),
  sourceCodeUrl: z.string().min(1, { message: "Debe de ser una url válida" }),
  deploymentUrl: z.string().min(1, { message: "Debe de ser una url válida" }),
  problem: z.string().min(1, { message: "Es necesario definir el problema" }),
  solution: z.string().min(1, { message: "Es necesario definir la solución" }),
  impact: z.string().min(1, { message: "Es necesario definir el imacto" }),
  teachings: z.string().min(1, {
    message:
      "Es necesario definir el aprendizaje como parte del desarrollo del proyecto",
  }),
  technologies: z.array(z.string()).min(1, {
    message: "Debes seleccionar al menos una tecnología usada en el proyecto",
  }),
});
