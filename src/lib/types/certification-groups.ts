import { CertificationGroupCreate } from "@/sections/certification-groups/form/create/schemas/certification-group-create-schema";
import { Certification } from "./certifications";

export interface CertificationGroup {
  title: string;
  certificationTitles: string[];
}

export interface CertificationGroupDetails {
  title: string;
  certifications: Certification[];
}

export interface CertificationGroupCreateDTO {
  title: string;
  certifications: string[]; // id of certifications
}

export const convertCertificationGroupCreateDTO = (
  certificationGroup: CertificationGroupCreate
): CertificationGroupCreateDTO => {
  return {
    ...certificationGroup,
  };
};
