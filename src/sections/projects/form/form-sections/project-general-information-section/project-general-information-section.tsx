import { RHFImageUpload } from "@/components/form/rhf-components/rhf-image-upload/rhf-image-upload";
import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileTextIcon } from "lucide-react";
import React from "react";

export default function ProjectGeneralInformationSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="w-5 h-5" />
          Información General
        </CardTitle>
        <CardDescription>Información básica del proyecto</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RHFTextField
          name="name"
          label="Nombre del Proyecto *"
          placeholder="Ingrese el nombre del proyecto"
          fullWidth
        />
        <RHFTextAreaField
          name="description"
          label="Descripción *"
          description="Describa brevemente el proyecto"
          fullWidth
        />
        <RHFImageUpload name="mainImage" label="Imagen del Proyecto" />
      </CardContent>
    </Card>
  );
}
