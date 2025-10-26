import { LevelEnum } from "@/lib/types/skill-groups";
import { z } from "zod";

export interface MasteredTechnologyEdit {
  technologyId: string;
  level: LevelEnum;
}

export const masteredTechnologyEditSchema = z.object({
  technologyId: z.string().min(1, {
    message: "El nombre de la habilidad no puede estar vacío",
  }),
  level: z.enum([LevelEnum.ADVANCED, LevelEnum.INTERMEDIATE, LevelEnum.BASIC]),
});
