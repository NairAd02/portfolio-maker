import { SkillGroupDetails } from "@/lib/types/skill-groups";
import React from "react";
import { Dot, Star } from "lucide-react";

interface Props {
  skillGroup: SkillGroupDetails;
}

export default function SkillGroupDetailsSkillsList({ skillGroup }: Props) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-primary" />
        Habilidades Detalladas
      </h3>
      <div className="grid xl:grid-cols-2 gap-3">
        {skillGroup.skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <Dot className="w-8 h-8" />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
