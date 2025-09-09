"use client";
import { RHFImageUpload } from "@/components/form/rhf-components/rhf-image-upload/rhf-image-upload";
import { RHFListField } from "@/components/form/rhf-components/rhf-list-field/rhf-list-field";
import React from "react";
import ExperienceAchievementStack from "../../stacks/experience-achievement-stack";
import useTechnologies from "@/sections/technologies/hooks/use-technologies";
import { RHFMultiSelectField } from "@/components/form/rhf-components/rhf-multi-select-field/rhf-multi-select-field";

interface Props {
  imageRecived?: { loading: boolean; error: string | null };
}

export default function ExperienceAdditionalInformationSection({
  imageRecived,
}: Props) {
  const { technologies, loadingData: loadingDataTechnologies } =
    useTechnologies();
  return (
    <div className="flex flex-col gap-4">
      <RHFImageUpload
        name="mainImage"
        label="Imagen representativa de la compañía (logo)"
        {...(imageRecived && { loading: imageRecived.loading })}
      />
      <RHFListField<{ name: string }>
        name="achievements"
        label="Logros"
        StackComponent={ExperienceAchievementStack}
        newItem={{
          name: "",
        }}
      />
      <RHFMultiSelectField
        name="technologies"
        label="Tecnologías"
        description="Seleccione las tecnologías que usó en su trayecto en la empresa"
        emptyText="No hay tecnologías disponibles"
        options={technologies.map((technology) => ({
          value: String(technology.id),
          label: technology.name,
        }))}
        columns={3}
        loading={loadingDataTechnologies}
      />
    </div>
  );
}
