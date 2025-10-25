import { z } from "zod";

export interface ContactSectionSchema {
  contact_text: string;
  contact_email: string;
  contact_phone: string;
  location: string;
  cv_doc?: File;
}

export const contactSectionSchema = z.object({
  contact_text: z.string().min(1, { message: "El campo es obligatorio" }),
  contact_email: z.string().email({
    message: "El email debe de tener un formato válido",
  }),
  contact_phone: z.string().min(1, { message: "El campo es requerido" }),
  location: z.string().min(1, { message: "El campo es requerido" }),
  cv_doc: z
    .instanceof(File, { message: "Debe ser un archivo válido" })
    .optional()
    .refine(
      (file) => {
        if (!file) return true; // Es opcional
        return file.size <= 10 * 1024 * 1024; // 10MB máximo
      },
      { message: "El archivo no puede superar los 10MB" }
    )
    .refine(
      (file) => {
        if (!file) return true; // Es opcional
        const allowedExtensions = [
          ".pdf",
          ".doc",
          ".docx",
          ".txt",
          ".xls",
          ".xlsx",
          ".ppt",
          ".pptx",
        ];
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
        return allowedExtensions.includes(fileExtension);
      },
      {
        message:
          "Solo se permiten archivos PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX",
      }
    ),
});
