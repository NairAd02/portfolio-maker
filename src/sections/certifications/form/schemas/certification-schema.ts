import { z } from "zod";

export interface CertificationSchema {
  id: string | number;
  title: string;
  description: string;
  institution: string;
  startdate: string;
  enddate: string;
  image?: string;
  link?: string;
}

export const certificationSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  description: z.string(),
  institution: z.string(),
  link: z.string().optional(),
  image: z.string().optional(),
  startdate: z.string(),
  enddate: z.string(),
});
