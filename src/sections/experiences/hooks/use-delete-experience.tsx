"use client";

import { deleteExperience as deleteExperienceService } from "@/lib/services/experiences";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteExperience({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteExperience = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      const res = await deleteExperienceService(id);
      if (!res.data || res.error)
        setError(
          res.error.message ||
            "Error durante la eliminación de la experiencia laboral"
        );
      else onDeleteAction();

      setLoading(false);
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteExperience };
}
