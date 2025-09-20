import { RHFImageUpload } from "@/components/form/rhf-components/rhf-image-upload/rhf-image-upload";
import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

interface Props {
  imageRecived?: { loading: boolean; error: string | null };
}

export default function PersonalInformationForm({ imageRecived }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <RHFTextField
            name="contact_name"
            label="Nombre de contacto"
            placeholder="El nombre por el cual quiere que lo contacten"
          />
        </div>
        <div className="space-y-2">
          <RHFTextAreaField
            name="introductory_phrase"
            label="Frase introductoria"
            placeholder="Una frase que te describa"
          />
        </div>
      </div>
      <div className="space-y-4">
        <RHFImageUpload
          name="contact_image"
          label="Foto de contacto"
          variant="avatar"
          {...(imageRecived && { loading: imageRecived.loading })}
        />
      </div>
    </div>
  );
}
