"use client";
import { useCallback, useState } from "react";
import { CertificationGroupEdit } from "../form/edit/schemas/certification-group-edit-schema";
import { editCertificationGroup as editCertificationGroupService } from "@/lib/services/certification-groups";
import { convertCertificationGroupEditDTO } from "@/lib/types/certification-groups";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditCertificationGroup({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editCertificationGroup = useCallback(
    async (certificationGroup: CertificationGroupEdit) => {
      setLoading(true);
      setError(null);

      const res = await editCertificationGroupService(
        id,
        convertCertificationGroupEditDTO(certificationGroup)
      );

      if (res.error)
        setError(
          res.error.message || "Error en la edición del grupo de certificación"
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
    editCertificationGroup,
  };
}
