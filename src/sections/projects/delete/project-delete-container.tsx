"use client";

import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import useDeleteProject from "../hooks/use-delete-project";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";

interface Props {
  id: string;
}

export default function ProjectDeleteContainer({ id }: Props) {
  const router = useRouter();
  const { deleteProject, loading, error } = useDeleteProject({
    id,
    onDeleteAction: () => {
      toast.success("Proyecto eliminado con éxito");
      revalidateServerPath(paths.projects.root);
      handleClose();
    },
  });
  const handleClose = useCallback(() => {
    router.push(paths.projects.root);
  }, [router]);
  return (
    <ConfirmationPanel
      title={"Eliminación del Proyecto"}
      message={"¿Seguro que desea eliminar el proyecto?"}
      warningMessage={
        "La eliminación del proyecto es irreversible, este cambio no se puede deshacer"
      }
      onConfirm={deleteProject}
      onCancel={handleClose}
      isLoading={loading}
      isDestructive
      error={error}
    />
  );
}
