import { RHFDatePickerField } from "@/components/form/rhf-components/rhf-date-picker-field/rhf-date-picker-field";
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
import { Building2, FileTextIcon } from "lucide-react";
import React from "react";

interface Props {
  imageRecived?: { loading: boolean; error: string | null };
}

export default function ExperienceGeneralInformationSection({
  imageRecived,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="w-5 h-5" />
          Información General
        </CardTitle>
        <CardDescription>
          Información básica de la experiencia laboral
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RHFImageUpload
          name="mainImage"
          label="Imagen representativa de la compañía (logo)"
          variant="avatar"
          avatarIcon={
            <Building2
              className="text-secondary dark:text-secondary"
              size={120 * 0.4}
            />
          }
          {...(imageRecived && { loading: imageRecived.loading })}
        />
        <div className="flex gap-6">
          <RHFTextField
            name="company"
            label="Empresa *"
            placeholder="Ingrese el nombre de la empresa en la que trabajó..."
            fullWidth
          />
          <RHFTextField
            name="position"
            label="Posición *"
            placeholder="Ingrese la labor que desempeño en dicha empresa..."
            fullWidth
          />
        </div>
        <RHFTextAreaField
          name="description"
          label="Descripción *"
          description="Describa brevemente como fue su experiencia en dicha empresa..."
          fullWidth
        />
        <div className="flex gap-6">
          <RHFDatePickerField
            name="startdate"
            label="Fecha de Inicio *"
            placeholder="Ingrese la fecha en la que empezó..."
          />
          <RHFDatePickerField
            name="enddate"
            label="Fecha de Finalización"
            placeholder="Ingrese la fecha en la que terminó..."
          />
        </div>
      </CardContent>
    </Card>
  );
}
