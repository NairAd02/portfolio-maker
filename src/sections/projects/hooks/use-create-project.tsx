"use client";
import { useCallback, useState } from "react";
import { ProjectCreate } from "../form/new/schemas/project-create-schema";
import { createProject as createProjectService } from "@/lib/services/projects";
import { convertProjectCreateDTO } from "@/lib/types/projects";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateProject({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = useCallback(
    async (project: ProjectCreate) => {
      setLoading(true);
      setError(null);

      const { mainImage, images, ...restProject } = project;

      // create form data for image
      const formData = new FormData();
      if (mainImage) formData.append("mainImage", mainImage);
      images.forEach((image) => {
        formData.append("image", image);
      });

      const res = await createProjectService(
        convertProjectCreateDTO(restProject),
        formData
      );

      if (res.error) {
        console.log(res.error);
        setError("Error en la creación del proyecto");
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
    createProject,
  };
}
