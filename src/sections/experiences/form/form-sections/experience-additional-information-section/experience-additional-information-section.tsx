"use client";
import { RHFListField } from "@/components/form/rhf-components/rhf-list-field/rhf-list-field";
import React from "react";
import ExperienceAchievementStack from "../../stacks/experience-achievement-stack";
import useTechnologies from "@/sections/technologies/hooks/use-technologies";
import { RHFMultiSelectField } from "@/components/form/rhf-components/rhf-multi-select-field/rhf-multi-select-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleEllipsis } from "lucide-react";

export default function ExperienceAdditionalInformationSection() {
  const { technologies, loadingData: loadingDataTechnologies } =
    useTechnologies();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleEllipsis className="w-5 h-5" />
          Información Adicional
        </CardTitle>
        <CardDescription>
          Información adicional de la experiencia laboral
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  );
}
