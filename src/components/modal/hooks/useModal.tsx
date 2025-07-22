import { useState } from "react";
import { InfoModal } from "../types/modalTypes";

export default function useModal() {
  const [currentModal, setCurrentModal] = useState<InfoModal[]>([]);

  const handleOpenModal = (infoModal: InfoModal) => {
    if (infoModal.onOpen) infoModal.onOpen();
    setCurrentModal((prev) => [...prev, infoModal]);
  };

  const handleCloseModal = (modalName: string, callOnClose: boolean = true) => {
    const modalToClose = currentModal.find((modal) => modal.name === modalName);
    if (modalToClose) {
      if (modalToClose.onClose && callOnClose) modalToClose.onClose();
      setCurrentModal((prev) =>
        prev.filter((infoModal) => infoModal.name !== modalName)
      );
    }
  };

  const onOpenChange = (modalName: string) => {
    handleCloseModal(modalName);
  };

  const getInfoModal = (modalName: string) =>
    currentModal.find((infoModal) => infoModal.name === modalName);

  const isModalOpen = (modalName: string) =>
    currentModal.some((infoModal) => infoModal.name === modalName);
  return {
    currentModal,
    onOpenChange,
    handleOpenModal,
    handleCloseModal,
    isModalOpen,
    getInfoModal,
  };
}
