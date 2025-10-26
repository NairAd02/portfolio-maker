import { RHFImageUpload } from "@/components/form/rhf-components/rhf-image-upload/rhf-image-upload";
import { RHFListField } from "@/components/form/rhf-components/rhf-list-field/rhf-list-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Aperture, FileTextIcon } from "lucide-react";
import React from "react";
import { SkillCreate } from "./create/schemas/skill-create-schema";
import SkillGroupSkillStack from "./stacks/skill-group-skill-stack";

interface Props {
  imageRecived?: { loading: boolean; error: string | null };
}

export default function SkillGroupForm({ imageRecived }: Props) {
  return (
    <div className="flex-1 overflow-auto flex flex-col max-h-[79vh] p-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon className="w-5 h-5" />
            Información General
          </CardTitle>
          <CardDescription>Información del Grupo de Habilidad</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-8">
            <RHFImageUpload
              name="icon"
              label="Icono del Grupo de Habilidades"
              variant="avatar"
              avatarIcon={
                <Aperture
                  className="text-secondary dark:text-secondary"
                  size={120 * 0.4}
                />
              }
              {...(imageRecived && { loading: imageRecived.loading })}
            />
            <RHFTextField
              name="name"
              label="Nombre del Grupo de Habilidad *"
              placeholder="Ingrese el nombre del grupo..."
              fullWidth
            />
          </div>
          <RHFListField<SkillCreate>
            name="skills"
            label="Habilidades"
            StackComponent={SkillGroupSkillStack}
            newItem={{
              name: "",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
