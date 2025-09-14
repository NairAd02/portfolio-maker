"use client";
import { deleteSkillGroup as deleteSkillGroupService } from "@/lib/services/skill-groups";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteSkillGroup({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteSkillGroup = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      const res = await deleteSkillGroupService(id);
      if (!res.data || res.error)
        setError(
          res.error.message ||
            "Error durante la eliminación del grupo de habilidades"
        );
      else onDeleteAction();

      setLoading(false);
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteSkillGroup };
}
