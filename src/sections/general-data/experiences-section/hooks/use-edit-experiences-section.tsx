"use client";
import { useCallback, useState } from "react";
import { editExperiencesSection as editExperiencesSectionService } from "@/lib/services/portfolio";
import { convertExperiencesSectionDTO } from "@/lib/types/portfolio";
import { ExperiencesSectionSchema } from "../form/schemas/experiences-section-schema";

interface Props {
  onEditAction: () => void;
}

export default function useEditExperiencesSection({ onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editExperiencesSection = useCallback(
    async (experiencesSection: ExperiencesSectionSchema) => {
      setLoading(true);
      setError(null);

      const res = await editExperiencesSectionService(
        convertExperiencesSectionDTO(experiencesSection)
      );

      if (res.error) {
        console.log(res.error);
        setError(
          res.error.message ||
            "Error en la edición de la sección de experiencias laborales"
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
    editExperiencesSection,
  };
}
