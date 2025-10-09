"use client";
import { useCallback, useState } from "react";
import { editContactSection as editContactSectionService } from "@/lib/services/portfolio";
import { convertContactSectionDTO } from "@/lib/types/portfolio";
import { ContactSectionSchema } from "../form/schemas/contact-section-schema";

interface Props {
  onEditAction: () => void;
}

export default function useEditContactSection({ onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editContactSection = useCallback(
    async (contactSection: ContactSectionSchema) => {
      setLoading(true);
      setError(null);

      const res = await editContactSectionService(
        convertContactSectionDTO(contactSection)
      );

      if (res.error) {
        console.log(res.error);
        setError(
          res.error.message || "Error en la edición de la sección de contacto"
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
    editContactSection,
  };
}
