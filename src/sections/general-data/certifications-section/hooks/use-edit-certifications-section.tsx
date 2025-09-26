"use client";
import { useCallback, useState } from "react";
import { editCertificationsSection as editCertificationsSectionService } from "@/lib/services/portfolio";
import { convertCertificationsSectionDTO } from "@/lib/types/portfolio";
import { CertificationsSectionSchema } from "../form/schemas/certifications-section-schema";

interface Props {
  onEditAction: () => void;
}

export default function useEditCertificationsSection({ onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editCertificationsSection = useCallback(
    async (certificationsSection: CertificationsSectionSchema) => {
      setLoading(true);
      setError(null);

      const res = await editCertificationsSectionService(
        convertCertificationsSectionDTO(certificationsSection)
      );

      if (res.error) {
        console.log(res.error);
        setError(
          res.error.message ||
            "Error en la edición de la sección de certificaciones"
        );
      } else {
        onEditAction();
      }

      setLoading(false);
    },
    [onEditAction]
  );
  return {
    loading,
    error,
    editCertificationsSection,
  };
}
