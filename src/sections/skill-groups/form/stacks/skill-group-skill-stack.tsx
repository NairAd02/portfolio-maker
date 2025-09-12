"use client";
import { RHFImageUpload } from "@/components/form/rhf-components/rhf-image-upload/rhf-image-upload";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { LevelEnum, levelMap } from "@/lib/types/skill-groups";
import { Aperture } from "lucide-react";
import React from "react";

interface Props {
  index: number;
}

export default function SkillGroupSkillStack({ index }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <RHFImageUpload
          name={`skills.${index}.icon`}
          withAdditionalInfo={false}
          variant="avatar"
          avatarIcon={
            <Aperture
              className="text-secondary dark:text-secondary"
              size={60 * 0.4}
            />
          }
          avatarSize={50}
        />
        <RHFTextField
          name={`skills.${index}.name`}
          placeholder="Introduzca la habilidad..."
          fullWidth
        />
      </div>
      <RHFSelectField
        name="level"
        label="Nivel de Habilidad"
        placeholder="Seleccione el nivel de habilidad que tiene en esta habilidad"
        options={[
          {
            value: LevelEnum.BASIC,
            label: levelMap.get(LevelEnum.BASIC)?.name as string,
          },
          {
            value: LevelEnum.INTERMEDIATE,
            label: levelMap.get(LevelEnum.INTERMEDIATE)?.name as string,
          },
          {
            value: LevelEnum.ADVANCED,
            label: levelMap.get(LevelEnum.ADVANCED)?.name as string,
          },
        ]}
      />
    </div>
  );
}
