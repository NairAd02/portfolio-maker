"use client";

import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import useDeleteBlog from "../hooks/use-delete-blog";

interface Props {
  id: string;
}

export default function BlogDeleteContainer({ id }: Props) {
  const router = useRouter();
  const { deleteBlog, loading, error } = useDeleteBlog({
    id,
    onDeleteAction: () => {
      toast.success("Publicación eliminada con éxito");
      revalidateServerPath(paths.blogs.root);
      handleClose();
      router.refresh();
    },
  });
  const handleClose = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <ConfirmationPanel
      title={"Eliminación de la Publicación"}
      message={"¿Seguro que desea eliminar la publicación?"}
      warningMessage={
        "La eliminación de la publicación es irreversible, este cambio no se puede deshacer"
      }
      onConfirm={deleteBlog}
      onCancel={handleClose}
      isLoading={loading}
      isDestructive
      error={error}
    />
  );
}
