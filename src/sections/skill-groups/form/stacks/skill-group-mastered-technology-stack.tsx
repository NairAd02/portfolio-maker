"use client";

import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { getLevelText, LevelEnum } from "@/lib/types/skill-groups";
import useTechnologies from "@/sections/technologies/hooks/use-technologies";
import React from "react";

interface Props {
  index: number;
}

export default function SkillGroupMasteredTechnologyStack({ index }: Props) {
  const { technologies, loadingData: loadingDataTechnologies } =
    useTechnologies();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <RHFSelectField
          name={`masteredTechnologies.${index}.technologyId`}
          options={technologies.map((tech) => ({
            label: tech.name,
            value: tech.id,
          }))}
          loading={loadingDataTechnologies}
          placeholder="tecnología..."
          fullWidth
        />
        <RHFSelectField
          name={`masteredTechnologies.${index}.level`}
          options={[
            {
              label: getLevelText(LevelEnum.ADVANCED),
              value: LevelEnum.ADVANCED,
            },
            {
              label: getLevelText(LevelEnum.INTERMEDIATE),
              value: LevelEnum.INTERMEDIATE,
            },
            {
              label: getLevelText(LevelEnum.BASIC),
              value: LevelEnum.BASIC,
            },
          ]}
          placeholder="dominio..."
          fullWidth
        />
      </div>
    </div>
  );
}
