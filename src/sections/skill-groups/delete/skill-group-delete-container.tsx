"use client";

import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import useDeleteSkillGroup from "../hooks/use-delete-skill-group";

interface Props {
  id: string;
}

export default function SkillGroupDeleteContainer({ id }: Props) {
  const router = useRouter();
  const { deleteSkillGroup, loading, error } = useDeleteSkillGroup({
    id,
    onDeleteAction: () => {
      toast.success("Grupo de habilidades eliminado con éxito");
      revalidateServerPath(paths.skillGroups.root);
      handleClose();
      router.refresh();
    },
  });
  const handleClose = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <ConfirmationPanel
      title={"Eliminación del Grupo de Habilidad"}
      message={"¿Seguro que desea eliminar el grupo de habildiad?"}
      warningMessage={
        "La eliminación del grupo de habildiad es irreversible, este cambio no se puede deshacer"
      }
      onConfirm={deleteSkillGroup}
      onCancel={handleClose}
      isLoading={loading}
      isDestructive
      error={error}
    />
  );
}
