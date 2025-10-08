"use client";

import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import useDeleteCertificationGroup from "../hooks/use-delete-certification-group";

interface Props {
  id: string;
}

export default function CertificationGroupDeleteContainer({ id }: Props) {
  const router = useRouter();
  const { deleteCertificationGroup, loading, error } =
    useDeleteCertificationGroup({
      id,
      onDeleteAction: () => {
        toast.success("Grupo de Certificaciones eliminado con éxito");
        revalidateServerPath(paths.certificationGroups.root);
        handleClose();
      },
    });
  const handleClose = useCallback(() => {
    router.push(paths.certificationGroups.root);
  }, [router]);
  return (
    <ConfirmationPanel
      title={"Eliminación del Grupo de Certificaciones"}
      message={"¿Seguro que desea eliminar el grupo de certificaciones?"}
      warningMessage={
        "La eliminación del grupo de certificaciones es irreversible, este cambio no se puede deshacer"
      }
      onConfirm={deleteCertificationGroup}
      onCancel={handleClose}
      isLoading={loading}
      isDestructive
      error={error}
    />
  );
}
