"use client";
import { useCallback, useState } from "react";
import { CertificationGroupCreate } from "../form/create/schemas/certification-group-create-schema";
import { createCertificationGroup as createCertificationGroupService } from "@/lib/services/certification-groups";
import { convertCertificationGroupCreateDTO } from "@/lib/types/certification-groups";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateCertificationGroup({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCertificationGroup = useCallback(
    async (certificationGroup: CertificationGroupCreate) => {
      setLoading(true);
      setError(null);

      const res = await createCertificationGroupService(
        convertCertificationGroupCreateDTO(certificationGroup)
      );

      if (res.error) {
        console.log(res.error);
        setError(
          res.error.message ||
            "Error en la creación del grupo de certificaciones"
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
    createCertificationGroup,
  };
}
