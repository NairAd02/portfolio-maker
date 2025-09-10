"use client";
import { useCallback, useState } from "react";
import { ExperienceEdit } from "../form/edit/schemas/experience-edit-schema";
import { editExperience as editExperienceService } from "@/lib/services/experiences";
import { convertExperienceEditDTO } from "@/lib/types/experiences";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditExperience({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editExperience = useCallback(
    async (experience: ExperienceEdit) => {
      const { mainImage, ...restExperience } = experience;

      setLoading(true);
      setError(null);
      // create form data for icon
      const formData = new FormData();
      if (mainImage) formData.append("mainImage", mainImage);

      const res = await editExperienceService(
        id,
        convertExperienceEditDTO(restExperience),
        formData
      );

      if (res.error)
        setError(
          res.error.message || "Error en la edición de la experiencia laboral"
        );
      else {
        onEditAction();
      }

      setLoading(false);
    },
    [onEditAction, id]
  );
  return {
    loading,
    error,
    editExperience,
  };
}
