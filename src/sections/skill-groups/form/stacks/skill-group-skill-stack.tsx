"use client";

import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

interface Props {
  index: number;
}

export default function SkillGroupSkillStack({ index }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <RHFTextField
          name={`skills.${index}.name`}
          placeholder="Introduzca la habilidad..."
          fullWidth
        />
      </div>
    </div>
  );
}
