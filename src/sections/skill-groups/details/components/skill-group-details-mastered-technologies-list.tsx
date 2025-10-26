import { SkillGroupDetails } from "@/lib/types/skill-groups";
import React from "react";
import { Star } from "lucide-react";
import MasteredTechnologyCard from "../../components/mastered-technology-card/mastered-technology-card";

interface Props {
  skillGroup: SkillGroupDetails;
}

export default function SkillGroupDetailsMasteredTechnologiesList({
  skillGroup,
}: Props) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-primary" />
        Tenologías Dominadas
      </h3>
      <div className="grid xl:grid-cols-2 gap-3">
        {skillGroup.masteredTechnologies.map((masteredTech, index) => (
          <MasteredTechnologyCard key={index} masteredTech={masteredTech} />
        ))}
      </div>
    </div>
  );
}
