"use client";
import { useCallback, useState } from "react";
import { PersonalInformationSchema } from "../form/schemas/personal-information-schema";
import { editPersonalInformation as editPersonalInformationService } from "@/lib/services/portfolio";
import { convertPersonalInformationDTO } from "@/lib/types/portfolio";

interface Props {
  onEditAction: () => void;
}

export default function useEditPersonalInformation({ onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editPersonalInformation = useCallback(
    async (personalInformation: PersonalInformationSchema) => {
      setLoading(true);
      setError(null);

      const { contact_image, ...restPersonalInformation } = personalInformation;

      // create form data for contact image
      const formData = new FormData();
      if (contact_image) formData.append("contact_image", contact_image);

      const res = await editPersonalInformationService(
        convertPersonalInformationDTO(restPersonalInformation),
        formData
      );

      if (res.error) {
        console.log(res.error);
        setError(
          res.error.message || "Error en la edición de la información personal"
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
    editPersonalInformation,
  };
}
