import { z } from "zod";

export interface CertificationSchema {
  id: string;
  title: string;
  description: string;
  institution: string;
  startdate: Date;
  enddate: Date;
  image?: File;
  link?: string;
}

export const certificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  institution: z.string(),
  link: z.string().optional(),
  image: z.string().optional(),
  startdate: z.string(),
  enddate: z.string(),
});
