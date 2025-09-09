import { RHFDatePickerField } from "@/components/form/rhf-components/rhf-date-picker-field/rhf-date-picker-field";
import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

export default function ExperienceGeneralInformationSection() {
  return (
    <div className="flex flex-col gap-4">
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
          placeholder="Ingrese la fecha en la que empezó a trabajar..."
        />
        <RHFDatePickerField
          name="enddate"
          label="Fecha de Finalización"
          placeholder="Ingrese la fecha en la que finalizó su trabajo (si es que ya finalizó)..."
        />
      </div>
    </div>
  );
}
