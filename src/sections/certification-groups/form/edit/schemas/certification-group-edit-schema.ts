import {
  certificationSchema,
  CertificationSchema,
} from "@/sections/certifications/form/schemas/certification-schema";
import { z } from "zod";

export interface CertificationGroupEdit {
  title: string;
  certifications: CertificationSchema[];
}

export const certificationGroupEditSchema = z.object({
  title: z.string().min(1, { message: "El campo es requerido" }),
  certifications: z.array(certificationSchema).min(1, {
    message:
      "Es necesario seleccionar al menos una certificación para poder crear el grupo",
  }),
});
