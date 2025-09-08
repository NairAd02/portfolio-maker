"use client";
import { useCallback, useState } from "react";
import { TechnologyEdit } from "../form/edit/schemas/technology-edit-schema";
import { editTechnology as editTechnologyService } from "@/lib/services/technologies";
import { convertTechnologyEditDTO } from "@/lib/types/technologies";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditTechnology({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editTechnology = useCallback(
    async (technology: TechnologyEdit) => {
      const { icon, ...restProject } = technology;

      setLoading(true);
      setError(null);
      // create form data for icon
      const formData = new FormData();
      if (icon) formData.append("icon", icon);

      const res = await editTechnologyService(
        id,
        convertTechnologyEditDTO(restProject),
        formData
      );

      if (res.error)
        setError(res.error.message || "Error en la edición de la tecnología");
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
    editTechnology,
  };
}
