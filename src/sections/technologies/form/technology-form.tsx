import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Aperture, FileTextIcon } from "lucide-react";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { RHFImageUpload } from "@/components/form/rhf-components/rhf-image-upload/rhf-image-upload";

interface Props {
  imageRecived?: { loading: boolean; error: string | null };
}

export default function TechnologyForm({ imageRecived }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="w-5 h-5" />
          Información General
        </CardTitle>
        <CardDescription>Información básica de la tecnología</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-8">
        <RHFImageUpload
          name="icon"
          label="Icono de la tecnología"
          variant="avatar"
          avatarIcon={
            <Aperture
              className="text-secondary dark:text-secondary"
              size={120 * 0.4}
            />
          }
          {...(imageRecived && { loading: imageRecived.loading })}
        />
        <RHFTextField
          name="name"
          label="Nombre de la tecnología *"
          placeholder="Ingrese el nombre de la tecnología"
          fullWidth
        />
      </CardContent>
    </Card>
  );
}
