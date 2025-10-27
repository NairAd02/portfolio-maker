import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import React from "react";

interface Props {
  index: number;
}

export default function ExperienceAchievementStack({ index }: Props) {
  return (
    <div className="flex items-center">
      <RHFTextAreaField
        name={`achievements.${index}.name`}
        placeholder="Introduzca un logro que alacanzó en dicha empresa..."
        fullWidth
      />
    </div>
  );
}
