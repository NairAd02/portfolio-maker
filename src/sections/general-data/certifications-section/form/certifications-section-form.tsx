import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import React from "react";

export default function CertificationsSectionForm() {
  return (
    <div>
      <RHFTextAreaField
        name="education_and_certifications_text"
        label="Texto de educación y certificaciones"
        placeholder="Descripción que aparecerá en la sección de educación y certificaciones..."
      />
    </div>
  );
}
