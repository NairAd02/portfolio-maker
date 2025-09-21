"use client";
import { useCallback, useState } from "react";
import { editProjectsSection as editProjectsSectionService } from "@/lib/services/portfolio";
import { convertProjectsSectionDTO } from "@/lib/types/portfolio";
import { ProjectsSectionSchema } from "../form/schemas/projects-section-schema";

interface Props {
  onEditAction: () => void;
}

export default function useEditProjectsSection({ onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editProjectsSection = useCallback(
    async (projectsSection: ProjectsSectionSchema) => {
      setLoading(true);
      setError(null);

      const res = await editProjectsSectionService(
        convertProjectsSectionDTO(projectsSection)
      );

      if (res.error) {
        console.log(res.error);
        setError(
          res.error.message || "Error en la edición de la sección de proyectos"
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
    editProjectsSection,
  };
}
