import { z } from "zod";

export interface AboutSectionSchema {
  about_text: string;
}

export const aboutSectionSchema = z.object({
  about_text: z.string().min(1, { message: "El campo es obligatorio" }),
});
