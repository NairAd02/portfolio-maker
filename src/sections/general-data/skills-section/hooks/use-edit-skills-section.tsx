"use client";
import { useCallback, useState } from "react";
import { editSkillsSection as editSkillsSectionService } from "@/lib/services/portfolio";
import { convertSkillsSectionDTO } from "@/lib/types/portfolio";
import { SkillsSectionSchema } from "../form/schemas/skills-section-schema";

interface Props {
  onEditAction: () => void;
}

export default function useEditSkillsSection({ onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editSkillsSection = useCallback(
    async (skillsSection: SkillsSectionSchema) => {
      setLoading(true);
      setError(null);

      const res = await editSkillsSectionService(
        convertSkillsSectionDTO(skillsSection)
      );

      if (res.error) {
        console.log(res.error);
        setError(
          res.error.message ||
            "Error en la edición de la sección de habilidades"
        );
      } else {
        onEditAction();
      }

      setLoading(false);
    },
    [onEditAction]
  );
  return {
    loading,
    error,
    editSkillsSection,
  };
}
