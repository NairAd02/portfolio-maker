import { z } from "zod";

export interface CertificationsSectionSchema {
  education_and_certifications_text: string;
}

export const certificationsSectionSchema = z.object({
  education_and_certifications_text: z
    .string()
    .min(1, { message: "El campo es obligatorio" }),
});
