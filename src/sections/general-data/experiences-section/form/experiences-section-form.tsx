import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import React from "react";

export default function ExperiencesSectionForm() {
  return (
    <div>
      <RHFTextAreaField
        name="work_experience_text"
        label="Texto de sección de experiencias laborales"
        placeholder="Descripción que aparecerá en la sección de experiencias laborales..."
      />
    </div>
  );
}
