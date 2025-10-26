import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  getLevelText,
  LevelEnum,
  SkillGroupDetails,
} from "@/lib/types/skill-groups";
import PreviewImage from "@/components/preview-image/preview-image";
import { principalPlaceHolder } from "@/lib/place-holders";
import SkillGroupDetailsMasteredTechnologiesList from "./components/skill-group-details-mastered-technologies-list";
import SkillGroupDetailsSkillsList from "./components/skill-group-details-skills-list";

interface Props {
  skillGroup: SkillGroupDetails;
}

export default function SkillGroupDetailsContainer({ skillGroup }: Props) {
  return (
    <div>
      <div className="flex items-center gap-3 pr-8">
        <PreviewImage
          preview={skillGroup.icon || principalPlaceHolder}
          height={76}
          width={76}
          rounded={"2xl"}
        />

        <div>
          <p className="text-2xl font-bold text-balance">{skillGroup.name}</p>
          <p className="text-muted-foreground mt-1">
            {skillGroup.skills.length} habilidad
            {skillGroup.skills.length !== 1 ? "es" : ""}
          </p>
        </div>
      </div>

      <div className="space-y-6 mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Resumen de Competencias</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.values(LevelEnum).map((level) => {
                const count = skillGroup.masteredTechnologies.filter(
                  (masteredTech) => masteredTech.level === level
                ).length;
                return (
                  <div key={level} className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {count}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {getLevelText(level)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <SkillGroupDetailsSkillsList skillGroup={skillGroup} />
        <SkillGroupDetailsMasteredTechnologiesList skillGroup={skillGroup} />
      </div>
    </div>
  );
}
