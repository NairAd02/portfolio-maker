"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { Button } from "@/components/ui/button";
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
  const handeRedirect = useCallback(() => {
    handleOpenModal({ name: creationPath });
  }, [handleOpenModal, creationPath]);

  return isModalRedirect ? (
    <Button onClick={handeRedirect}>{buttonText}</Button>
  ) : (
    <NavigationComponent href={creationPath}>
      <Button>{buttonText}</Button>
    </NavigationComponent>
  );
}
