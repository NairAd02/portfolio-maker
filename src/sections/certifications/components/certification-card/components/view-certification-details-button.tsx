"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";

interface Props {
  certificationId: string;
}

export default function ViewDetailsCertificationButton({
  certificationId,
}: Props) {
  const { handleOpenModal } = useContext(ModalContext);
  return (
    <Button
      className="w-full"
      onClick={(e) => {
        e.stopPropagation();
        handleOpenModal({
          name: modalTypes.certificationDetailsModal.name,
          entity: certificationId,
        });
      }}
      type="button"
      variant="outline"
    >
      Ver Detalles
    </Button>
  );
}
