import { z } from "zod";

export interface BlogCreate {
  name: string;
  description: string;
  date: Date;
  link: string;
}

export const blogCreateSchema = z.object({
  name: z.string().min(1, { message: "El campo es requerido" }),
  description: z.string().min(1, { message: "El campo es requerido" }),
  link: z.string(),
  date: z
    .date()
    .refine((date) => date <= new Date(), {
      message: "La fecha no puede ser futura",
    })
    .refine((date) => date >= new Date("1900-01-01"), {
      message: "La fecha es demasiado antigua",
    }),
});
