"use client";

import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import React from "react";

interface Props {
  index: number;
}

export default function SkillGroupSkillStack({ index }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <RHFTextAreaField
          name={`skills.${index}.name`}
          placeholder="Introduzca la habilidad..."
          fullWidth
        />
      </div>
    </div>
  );
}
