"use client";
import { useCallback, useState } from "react";
import { ProjectEdit } from "../form/edit/schemas/project-edit-schema";
import { editProject as editProjectService } from "@/lib/services/projects";
import { convertProjectEditDTO } from "@/lib/types/projects";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditProject({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editProject = useCallback(
    async (project: ProjectEdit) => {
      const { mainImage, images, ...restProject } = project;

      setLoading(true);
      setError(null);
      // create form data for image
      const formData = new FormData();
      if (mainImage) formData.append("mainImage", mainImage);
      images.forEach((image) => {
        formData.append("images[]", image);
      });

      const res = await editProjectService(
        id,
        convertProjectEditDTO(restProject),
        formData
      );

      if (res.error)
        setError(res.error.message || "Error en la edición del proyecto");
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
    editProject,
  };
}
