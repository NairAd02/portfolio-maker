"use client";

import { getProjectById } from "@/lib/services/projects";
import { ProjectDetails } from "@/lib/types/projects";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useProject({ id }: Props) {
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchProject = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getProjectById(id);

        if (!res.data || res.error)
          throw new Error("Error al cargar la información del proyecto");

        setProject(res.data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);
  return { project, error, loading, fetchProject };
}
