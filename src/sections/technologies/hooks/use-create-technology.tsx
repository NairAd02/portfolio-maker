"use client";
import { useCallback, useState } from "react";
import { convertTechnologyCreateDTO } from "@/lib/types/technologies";
import { TechnologyCreate } from "../form/create/schemas/technology-create-schema";
import { createTechnology as createTechnologyService } from "@/lib/services/technologies";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateTechnology({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTechnology = useCallback(
    async (technology: TechnologyCreate) => {
      setLoading(true);
      setError(null);

      const { icon, ...restTechnology } = technology;

      // create form data for image
      const formData = new FormData();
      if (icon) formData.append("icon", icon);

      const res = await createTechnologyService(
        convertTechnologyCreateDTO(restTechnology),
        formData
      );

      if (res.error) {
        console.log(res.error);
        setError("Error en la creación de la tecnología");
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
    createTechnology,
  };
}
