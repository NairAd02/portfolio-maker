"use client";

import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import useDeleteTechnology from "../hooks/use-delete-technology";

interface Props {
  id: string;
}

export default function TechnologyDeleteContainer({ id }: Props) {
  const router = useRouter();
  const { deleteTechnology, loading, error } = useDeleteTechnology({
    id,
    onDeleteAction: () => {
      toast.success("Tecnología eliminada con éxito");
      revalidateServerPath(paths.technologies.root);
      handleClose();
    },
  });
  const handleClose = useCallback(() => {
    router.push(paths.technologies.root);
  }, [router]);
  return (
    <ConfirmationPanel
      title={"Eliminación de la Tecnología"}
      message={"¿Seguro que desea eliminar la tecnología?"}
      warningMessage={
        "La eliminación de la tecnología es irreversible, este cambio no se puede deshacer"
      }
      onConfirm={deleteTechnology}
      onCancel={handleClose}
      isLoading={loading}
      isDestructive
      error={error}
    />
  );
}
