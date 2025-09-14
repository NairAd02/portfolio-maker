import { SkillGroupDetails } from "@/lib/types/skill-groups";
import React from "react";
import SkillCard from "../../components/skill-card/skill-card";
import { Star } from "lucide-react";

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
      <div className="grid gap-3">
        {skillGroup.skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
}
