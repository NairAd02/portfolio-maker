import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import React from "react";

export default function AboutSectionForm() {
  return (
    <div>
      <RHFTextAreaField
        name="about_text"
        label="Texto de presentación"
        placeholder="Cuéntanos sobre ti, tu experiencia y tus objetivos profesionales..."
      />
    </div>
  );
}
