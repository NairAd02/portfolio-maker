import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getLevelColor, getLevelText, Skill } from "@/lib/types/skill-groups";
import SkillLevelStars from "../skill-level-starts/skill-level-starts";
import { Badge } from "@/components/ui/badge";

interface Props {
  skill: Skill;
}

export default function SkillCard({ skill }: Props) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {skill.icon && <span className="text-xl">{skill.icon}</span>}
            <div>
              <h4 className="font-medium">{skill.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <SkillLevelStars level={skill.level} />
                <span className="text-sm text-muted-foreground">
                  {getLevelText(skill.level)}
                </span>
              </div>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`${getLevelColor(skill.level)} border`}
          >
            {getLevelText(skill.level)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
