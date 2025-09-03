"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RHFMultiSelectField } from "@/components/form/rhf-components/rhf-multi-select-field/rhf-multi-select-field";
import useTechnologies from "@/sections/technologies/hooks/use-technologies";
import { RHFMultiFileUpload } from "@/components/form/rhf-components/rhf-multi-file-upload/rhf-multi-file-upload";

interface Props {
  imagesRecived?: { loading: boolean; error: string | null };
}

export default function ProjectResourcesSection({ imagesRecived }: Props) {
  const { technologies, loadingData: loadingDataTechnologies } =
    useTechnologies();
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tecnologías</CardTitle>
          <CardDescription>
            Tecnologías utilizadas en el proyecto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RHFMultiSelectField
            name="technologies"
            label="Tecnologías"
            description="Seleccione las tecnologías usadas en el proyecto"
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Imágenes Adicionales</CardTitle>
          <CardDescription>Galería de imágenes del proyecto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RHFMultiFileUpload
            name="images"
            label="Subir imágenes (máximo 5)"
            maxSize={10 * 1024 * 1024} // 10MB
            acceptedFileTypes={{
              "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
            }}
            compressImages={true}
            quality={85}
            maxWidth={1920}
            {...(imagesRecived && { loading: imagesRecived.loading })}
          />
        </CardContent>
      </Card>
    </div>
  );
}
