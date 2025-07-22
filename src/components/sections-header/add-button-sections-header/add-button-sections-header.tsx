"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext } from "react";

interface Props {
  buttonText?: string;
  creationPath: string;
  isModalRedirect?: boolean;
}

export default function AddButtonSectionsHeader({
  buttonText = "Añadir Registro",
  creationPath,
  isModalRedirect,
}: Props) {
  const { handleOpenModal } = useContext(ModalContext);
  const router = useRouter();
  const handeRedirect = useCallback(() => {
    if (isModalRedirect) handleOpenModal({ name: creationPath });
    else router.push(creationPath);
  }, [handleOpenModal, isModalRedirect, router, creationPath]);

  return <Button onClick={handeRedirect}>{buttonText}</Button>;
}
