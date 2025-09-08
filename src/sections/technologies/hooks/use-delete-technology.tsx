"use client";
import { deleteTechnology as deleteTechnologyService } from "@/lib/services/technologies";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteTechnology({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteTechnology = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      const res = await deleteTechnologyService(id);
      if (!res.data || res.error)
        setError(
          res.error.message || "Error durante la eliminación de la tecnología"
        );
      else onDeleteAction();

      setLoading(false);
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteTechnology };
}
