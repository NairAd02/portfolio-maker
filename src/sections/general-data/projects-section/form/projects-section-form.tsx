import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import React from "react";

export default function ProjectsSectionForm() {
  return (
    <div>
      <RHFTextAreaField
        name="feature_project_text"
        label="Texto de sección de proyectos"
        placeholder="Descripción que aparecerá en la sección de proyectos destacados..."
      />
    </div>
  );
}
