import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import React from "react";

export default function ContactSectionForm() {
  return (
    <div className="flex items-center justify-center gap-6">
      <RHFTextAreaField
        name="contact_email"
        label="Email de contacto"
        placeholder="tu@email.com"
      />
      <RHFTextAreaField
        name="contact_text"
        label="Texto de contacto"
        placeholder="Descripción para la sección de contacto"
      />
    </div>
  );
}
