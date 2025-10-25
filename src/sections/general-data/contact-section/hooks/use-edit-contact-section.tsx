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

      const { cv_doc, ...restContactSection } = contactSection;

      // create form data for contact image
      const formData = new FormData();
      if (cv_doc) formData.append("cv_doc", cv_doc);

      const res = await editContactSectionService(
        convertContactSectionDTO(restContactSection),
        formData
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
