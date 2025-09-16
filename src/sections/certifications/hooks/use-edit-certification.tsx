"use client";
import { useCallback, useState } from "react";
import { CertificationEdit } from "../form/edit/schemas/certification-edit-schema";
import { editCertification as editCertificationService } from "@/lib/services/certifications";
import { convertCertificationEditDTO } from "@/lib/types/certifications";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditCertification({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editCertification = useCallback(
    async (certification: CertificationEdit) => {
      const { image, ...restCertification } = certification;

      setLoading(true);
      setError(null);
      // create form data for image
      const formData = new FormData();
      if (image) formData.append("image", image);

      const res = await editCertificationService(
        id,
        convertCertificationEditDTO(restCertification),
        formData
      );

      if (res.error)
        setError(
          res.error.message || "Error en la edición de la certificación"
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
    editCertification,
  };
}
