import { Technology } from "./technologies";


export interface Proyect {
  id: string;
  name: string;
  description: string;
  mainImage?: string;
  sourceCodeUrl?: string;
  deploymentUrl?: string;
  images: string[];
  problem: string;
  solution: string;
  impact: string;
  teachings: string;
  technologies: Technology[];
}
