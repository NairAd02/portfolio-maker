"use client";

import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import useDeleteExperience from "../hooks/use-delete-experience";

interface Props {
  id: string;
}

export default function ExperienceDeleteContainer({ id }: Props) {
  const router = useRouter();
  const { deleteExperience, loading, error } = useDeleteExperience({
    id,
    onDeleteAction: () => {
      toast.success("Experiencia Laboral eliminada con éxito");
      revalidateServerPath(paths.experiences.root);
      handleClose();
    },
  });
  const handleClose = useCallback(() => {
    router.push(paths.experiences.root);
  }, [router]);
  return (
    <ConfirmationPanel
      title={"Eliminación de Experiencia Laboral"}
      message={"¿Seguro que desea eliminar la experiencia laboral?"}
      warningMessage={
        "La eliminación de la experiencia laboral es irreversible, este cambio no se puede deshacer"
      }
      onConfirm={deleteExperience}
      onCancel={handleClose}
      isLoading={loading}
      isDestructive
      error={error}
    />
  );
}
