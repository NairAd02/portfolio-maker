import { RHFDatePickerField } from "@/components/form/rhf-components/rhf-date-picker-field/rhf-date-picker-field";
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

export default function BlogForm() {
  return (
    <div className="flex-1 overflow-auto flex flex-col max-h-[75vh] p-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon className="w-5 h-5" />
            Información General
          </CardTitle>
          <CardDescription>
            Información general de la Publicación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {" "}
            <RHFTextField
              name="name"
              label="Título *"
              placeholder="Ingrese el título de la publicación..."
              fullWidth
            />
            <RHFDatePickerField
              name="date"
              label="Fecha Publicación *"
              placeholder="Ingrese la fecha de publicación..."
            />
          </div>
          <RHFTextField
            name="link"
            label="Enlace"
            placeholder="Ingrese el enlace de la certificación..."
            fullWidth
          />
          <RHFTextAreaField
            name="description"
            label="Descripción *"
            placeholder="Ingrese una breve descripción sobre la certificación..."
            fullWidth
          />
        </CardContent>
      </Card>
    </div>
  );
}
