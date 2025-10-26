import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  getLevelColor,
  getLevelText,
  MasteredTechnology,
} from "@/lib/types/skill-groups";
import SkillLevelStars from "../skill-level-starts/skill-level-starts";
import { Badge } from "@/components/ui/badge";
import PreviewImage from "@/components/preview-image/preview-image";

interface Props {
  masteredTech: MasteredTechnology;
}

export default function MasteredTechnologyCard({ masteredTech }: Props) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {masteredTech.technology.icon && (
              <PreviewImage
                preview={masteredTech.technology.icon}
                height={56}
                width={56}
                rounded={"2xl"}
              />
            )}
            <div>
              <h4 className="font-medium">{masteredTech.technology.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <SkillLevelStars level={masteredTech.level} />
                <span className="text-sm text-muted-foreground">
                  {getLevelText(masteredTech.level)}
                </span>
              </div>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`${getLevelColor(masteredTech.level)} border`}
          >
            {getLevelText(masteredTech.level)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
