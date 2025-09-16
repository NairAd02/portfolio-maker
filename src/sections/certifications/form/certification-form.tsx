import { RHFDatePickerField } from "@/components/form/rhf-components/rhf-date-picker-field/rhf-date-picker-field";
import { RHFImageUpload } from "@/components/form/rhf-components/rhf-image-upload/rhf-image-upload";
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

interface Props {
  imageRecived?: { loading: boolean; error: string | null };
}

export default function CertificationForm({ imageRecived }: Props) {
  return (
    <div className="flex-1 overflow-auto flex flex-col max-h-[75vh] p-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon className="w-5 h-5" />
            Información General
          </CardTitle>
          <CardDescription>
            Información general de la certificación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RHFImageUpload
            name="image"
            label="Imagen representativa de la certificación"
            {...(imageRecived && { loading: imageRecived.loading })}
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
          <div className="flex gap-6">
            <RHFTextField
              name="title"
              label="Título *"
              placeholder="Ingrese el título de la certificación..."
              fullWidth
            />
            <RHFTextField
              name="institution"
              label="Institución *"
              placeholder="Ingrese la institución de la que adquirió la certificación..."
              fullWidth
            />
          </div>
          <RHFTextField
            name="link"
            label="Enlace"
            placeholder="Ingrese el enlace de la certificación..."
            fullWidth
          />
        </CardContent>
      </Card>
    </div>
  );
}
