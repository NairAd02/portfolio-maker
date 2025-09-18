import { CertificationGroupCreate } from "@/sections/certification-groups/form/create/schemas/certification-group-create-schema";
import { Certification } from "./certifications";
import { CertificationGroupEdit } from "@/sections/certification-groups/form/edit/schemas/certification-group-edit-schema";

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

export interface CertificationGroupEditDTO {
  title: string;
  certifications: string[]; // id of certifications
}

export const convertCertificationGroupCreateDTO = (
  certificationGroup: CertificationGroupCreate
): CertificationGroupCreateDTO => {
  return {
    ...certificationGroup,
    certifications: certificationGroup.certifications.map((certification) =>
      String(certification.id)
    ),
  };
};

export const convertCertificationGroupEditDTO = (
  certificationGroup: CertificationGroupEdit
): CertificationGroupEditDTO => {
  return {
    ...certificationGroup,
    certifications: certificationGroup.certifications.map((certification) =>
      String(certification.id)
    ),
  };
};
