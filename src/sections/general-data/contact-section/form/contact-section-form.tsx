import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { RHFFileUpload } from "@/components/form/rhf-components/rhf-file-upload/rhf-file-upload";
import React from "react";

interface Props {
  fileReceived?: {
    loading: boolean;
    error: string | null;
  };
}

export default function ContactSectionForm({ fileReceived }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center gap-6">
        <RHFTextField
          name="contact_email"
          label="Email de contacto"
          placeholder="tu@email.com"
        />
        <RHFTextField
          name="contact_phone"
          label="Teléfono de contacto"
          placeholder="+1 234 567 8900"
        />
      </div>
      <div className="flex items-center justify-center gap-6">
        <RHFTextField
          name="location"
          label="Ubicación"
          placeholder="Ciudad, País"
        />
        <RHFFileUpload
          name="cv_doc"
          label="CV / Documento"
          {...(fileReceived && {
            loading: fileReceived.loading,
          })}
          acceptedFormats={[".pdf", ".doc", ".docx"]}
          maxSize={10 * 1024 * 1024} // 10MB
        />
      </div>
      <RHFTextAreaField
        name="contact_text"
        label="Texto de contacto"
        placeholder="Descripción para la sección de contacto"
      />
    </div>
  );
}
