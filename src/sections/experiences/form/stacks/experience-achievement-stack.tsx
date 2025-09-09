import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

interface Props {
  index: number;
}

export default function ExperienceAchievementStack({ index }: Props) {
  return (
    <div className="flex items-center">
      <RHFTextField
        name={`achievements.${index}.name`}
        placeholder="Introduzca un logro que alacanzó en dicha empresa..."
        fullWidth
      />
    </div>
  );
}
