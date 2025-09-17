import { z } from "zod";

export interface CertificationGroupCreate {
  title: string;
  certifications: string[];
}

export const certificationGroupCreateSchema = z.object({
  title: z.string().min(1, { message: "El campo es requerido" }),
  certifications: z.array(z.string()).min(1, {
    message:
      "Debes seleccionar al menos una certificación para poder crear el grupo",
  }),
});
