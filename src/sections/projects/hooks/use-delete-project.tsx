"use client";

import { deleteProject as deleteProjectService } from "@/lib/services/projects";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteProject({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteProject = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      const res = await deleteProjectService(id);
      if (!res.data || res.error)
        setError(
          res.error.message || "Error durante la eliminación del proyecto"
        );
      else onDeleteAction();

      setLoading(false);
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteProject };
}
