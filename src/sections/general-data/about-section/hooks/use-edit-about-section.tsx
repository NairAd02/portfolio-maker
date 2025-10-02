"use client";
import { useCallback, useState } from "react";
import { editAboutSection as editAboutSectionService } from "@/lib/services/portfolio";
import { convertAboutSectionDTO } from "@/lib/types/portfolio";
import { AboutSectionSchema } from "../form/schemas/about-section-schema";

interface Props {
  onEditAction: () => void;
}

export default function useEditAboutSection({ onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editAboutSection = useCallback(
    async (aboutSection: AboutSectionSchema) => {
      setLoading(true);
      setError(null);

      const res = await editAboutSectionService(
        convertAboutSectionDTO(aboutSection)
      );

      if (res.error) {
        console.log(res.error);
        setError(
          res.error.message || "Error en la edición de la sección de acerca de"
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
    editAboutSection,
  };
}
