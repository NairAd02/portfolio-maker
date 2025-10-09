import { z } from "zod";

export interface ContactSectionSchema {
  contact_text: string;
  contact_email: string;
}

export const contactSectionSchema = z.object({
  contact_text: z.string().min(1, { message: "El campo es obligatorio" }),
  contact_email: z.email({
    message: "El email debe de tener un formato válido",
  }),
});
