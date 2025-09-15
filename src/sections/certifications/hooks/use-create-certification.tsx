"use client";
import { useCallback, useState } from "react";
import { CertificationCreate } from "../form/create/schemas/certification-create-schema";
import { createCertification as createCertificationService } from "@/lib/services/certifications";
import { convertCertificationCreateDTO } from "@/lib/types/certifications";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateCertification({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCertification = useCallback(
    async (certification: CertificationCreate) => {
      setLoading(true);
      setError(null);

      const { image, ...restCertification } = certification;

      // create form data for image
      const formData = new FormData();
      if (image) formData.append("image", image);

      const res = await createCertificationService(
        convertCertificationCreateDTO(restCertification),
        formData
      );

      if (res.error) {
        console.log(res.error);
        setError(
          res.error.message || "Error en la creación de la certificación"
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
    createCertification,
  };
}
