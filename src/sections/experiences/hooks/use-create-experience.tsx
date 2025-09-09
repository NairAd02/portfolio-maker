"use client";
import { useCallback, useState } from "react";
import { convertExperienceCreateDTO } from "@/lib/types/experiences";
import { ExperienceCreate } from "../form/create/schemas/experience-create-schema";
import { createExperience as createExperienceService } from "@/lib/services/experiences";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateExperience({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createExperience = useCallback(
    async (experience: ExperienceCreate) => {
      setLoading(true);
      setError(null);

      const { mainImage, ...restExperience } = experience;

      // create form data for image
      const formData = new FormData();
      if (mainImage) formData.append("mainImage", mainImage);

      const res = await createExperienceService(
        convertExperienceCreateDTO(restExperience),
        formData
      );

      if (res.error) {
        console.log(res.error);
        setError(
          res.error.message ||
            "Error en la creación de la experiencia de trabajo"
        );
      } else {
        onCreateAction();
      }

      setLoading(false);
    },
    [onCreateAction]
  );
  return {
    loading,
    error,
    createExperience,
  };
}
