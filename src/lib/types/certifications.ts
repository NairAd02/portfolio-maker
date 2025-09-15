import { CertificationCreate } from "@/sections/certifications/form/create/schemas/certification-create-schema";

export interface Certification {
  id: string;
  title: string;
  institution: string;
  startdate: string;
  enddate: string;
  image?: string;
  link?: string;
}

export interface CertificationDetails {
  id: string;
  title: string;
  institution: string;
  startdate: string;
  enddate: string;
  image?: string;
  link?: string;
}

export interface CertificationCreateDTO {
  title: string;
  institution: string;
  startdate: string;
  enddate: string;
  link?: string;
}

export const convertCertificationCreateDTO = (
  certification: Omit<CertificationCreate, "image">
): CertificationCreateDTO => {
  return {
    ...certification,
    link: certification.link || undefined,
    startdate: certification.startdate.toISOString(),
    enddate: certification.enddate.toISOString(),
  };
};
