import { Certification } from "./certifications";

export interface CertificationGroup {
  title: string;
  certificationTitles: string[];
}

export interface CertificationGroupDetails {
  title: string;
  certifications: Certification[];
}
