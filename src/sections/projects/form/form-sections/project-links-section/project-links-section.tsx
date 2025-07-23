import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "lucide-react";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";

export default function ProjectLinksSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="w-5 h-5" />
          Enlaces del Proyecto
        </CardTitle>
        <CardDescription>URLs relacionadas con el proyecto</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RHFTextField
          name="sourceCodeUrl"
          label="URL del Código Fuente"
          placeholder="https://github.com/usuario/proyecto"
          fullWidth
        />
        <RHFTextField
          name="deploymentUrl"
          label="URL de Despliegue"
          placeholder="https://miproyecto.com"
          fullWidth
        />
      </CardContent>
    </Card>
  );
}
