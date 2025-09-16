"use client";

import { deleteCertification as deleteCertificationService } from "@/lib/services/certifications";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteCertification({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteCertification = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      const res = await deleteCertificationService(id);
      if (!res.data || res.error)
        setError(
          res.error.message ||
            "Error durante la eliminación de la certificación"
        );
      else onDeleteAction();

      setLoading(false);
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteCertification };
}
