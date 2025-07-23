import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";

export default function ProjectContentSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Contenido del Proyecto
        </CardTitle>
        <CardDescription>
          Detalles sobre el problema, solución e impacto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RHFTextAreaField
          name="problem"
          label="Problema *"
          description="Describa el problema que resuelve este proyecto"
          fullWidth
        />

        <RHFTextAreaField
          name="solution"
          label="Solución *"
          description="Explique cómo el proyecto soluciona el problema"
          fullWidth
        />

        <RHFTextAreaField
          name="impact"
          label="Impacto *"
          description="Describa el impacto o beneficios del proyecto"
          fullWidth
        />

        <RHFTextAreaField
          name="teachings"
          label="Aprendizajes *"
          description="¿Qué aprendió durante el desarrollo de este proyecto?"
          fullWidth
        />
      </CardContent>
    </Card>
  );
}
