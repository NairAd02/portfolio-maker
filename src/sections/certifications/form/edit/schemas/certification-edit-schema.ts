import { z } from "zod";

export interface CertificationEdit {
  title: string;
  description: string;
  institution: string;
  startdate: Date;
  enddate: Date;
  image?: File;
  link: string;
}

export const certificationEditSchema = z
  .object({
    title: z.string().min(1, { message: "El campo es requerido" }),
    description: z.string(),
    institution: z.string().min(1, { message: "El campo es requerido" }),
    link: z.string(),
    image: z
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
      .refine((date) => date <= new Date(), {
        message: "La fecha no puede ser futura",
      })
      .refine((date) => date >= new Date("1900-01-01"), {
        message: "La fecha es demasiado antigua",
      }),
  })
  .refine(
    (data) => {
      return data.startdate <= data.enddate;
    },
    {
      message: "La fecha de inicio no puede ser mayor que la fecha de fin",
      path: ["startdate"],
    }
  );
