import { z } from "zod";

export interface Credentials {
  firstCredential: string;
  password: string;
}

export const credentialsSchema = z.object({
  firstCredential: z
    .string()
    .min(3, { message: "El nombre usuario no es válido" }),
  password: z.string().min(1, { message: "Debe introducir una constraseña" }),
});
