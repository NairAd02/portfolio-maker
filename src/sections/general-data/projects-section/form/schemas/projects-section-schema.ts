import { z } from "zod";

export interface ProjectsSectionSchema {
  feature_project_text: string;
}

export const personalInformationSchema = z.object({
  feature_project_text: z
    .string()
    .min(1, { message: "El campo es obligatorio" }),
});
