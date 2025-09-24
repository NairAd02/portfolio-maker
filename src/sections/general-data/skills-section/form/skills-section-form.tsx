import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import React from "react";

export default function SkillsSectionForm() {
  return (
    <div>
      <RHFTextAreaField
        name="technologies_and_skills_text"
        label="Texto de tecnologías y habilidades"
        placeholder="Descripción que aparecerá en la sección de tecnologías y habilidades..."
      />
    </div>
  );
}
