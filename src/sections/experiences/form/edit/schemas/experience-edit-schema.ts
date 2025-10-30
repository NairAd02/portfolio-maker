import { z } from "zod";

export interface ExperienceEdit {
  company: string;
  position: string;
  startdate: Date;
  enddate: Date | null;
  description: string;
  achievements: { name: string }[];
  mainImage?: File;
  technologies: string[];
}

export const experienceEditSchema = z
  .object({
    company: z.string().min(1, { message: "El campo es requerido" }),
    position: z.string().min(1, { message: "El campo es requerido" }),
    description: z.string().min(1, { message: "El campo es requerido" }),
    achievements: z.array(
      z.object({
        name: z.string().min(1, { message: "El campo es requerido" }),
      })
    ),
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
    technologies: z.array(z.string()).min(1, {
      message:
        "Debes seleccionar al menos una tecnología que haya usado en durante esa experiencia laboral",
    }),
    startdate: z
      .date()
      .refine((date) => date <= new Date(), {
        message: "La fecha no puede ser futura",
      })
      .refine((date) => date >= new Date("1900-01-01"), {
        message: "La fecha es demasiado antigua",
      }),
    enddate: z
      .date()
      .nullable() // <-- Cambiado a opcional
      .refine((date) => !date || date <= new Date(), {
        // <-- Validación condicional
        message: "La fecha no puede ser futura",
      })
      .refine((date) => !date || date >= new Date("1900-01-01"), {
        // <-- Validación condicional
        message: "La fecha es demasiado antigua",
      }),
  })
  .refine(
    (data) => {
      if (!data.enddate) return true;
      return data.startdate <= data.enddate;
    },
    {
      message: "La fecha de inicio no puede ser mayor que la fecha de fin",
      path: ["startdate"],
    }
  );
