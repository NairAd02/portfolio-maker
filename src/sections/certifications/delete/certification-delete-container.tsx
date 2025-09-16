"use client";

import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import useDeleteCertification from "../hooks/use-delete-certification";

interface Props {
  id: string;
}

export default function CertificationDeleteContainer({ id }: Props) {
  const router = useRouter();
  const { deleteCertification, loading, error } = useDeleteCertification({
    id,
    onDeleteAction: () => {
      toast.success("Certificación eliminada con éxito");
      revalidateServerPath(paths.certifications.root);
      handleClose();
      router.refresh();
    },
  });
  const handleClose = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <ConfirmationPanel
      title={"Eliminación de la Certificación"}
      message={"¿Seguro que desea eliminar la certificación?"}
      warningMessage={
        "La eliminación de la certificación es irreversible, este cambio no se puede deshacer"
      }
      onConfirm={deleteCertification}
      onCancel={handleClose}
      isLoading={loading}
      isDestructive
      error={error}
    />
  );
}
