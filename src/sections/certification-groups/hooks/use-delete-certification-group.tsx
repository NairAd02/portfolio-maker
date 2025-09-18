"use client";

import { deleteCertificationGroup as deleteCertificationGroupService } from "@/lib/services/certification-groups";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteCertificationGroup({
  id,
  onDeleteAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteCertificationGroup = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      const res = await deleteCertificationGroupService(id);
      if (!res.data || res.error)
        setError(
          res.error.message ||
            "Error durante la eliminación del grupo de certificaciones"
        );
      else onDeleteAction();

      setLoading(false);
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteCertificationGroup };
}
