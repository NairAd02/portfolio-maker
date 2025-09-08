import { Technology } from "./technologies";

export interface Experience {
  id: string;
  company: string;
  position: string;
  startdate: string;
  enddate: string;
  description: string;
  mainImage: string;
}

export interface ExperienceDetails {
  id: string;
  company: string;
  position: string;
  startdate: string;
  enddate: string;
  description: string;
  mainImage: string;
  achievements: string[];
  technologies: Technology[];
}
