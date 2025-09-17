"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Certification } from "@/lib/types/certifications";
import { useCallback, useContext, useState } from "react";

interface Props {
  action: (certifications: Certification[]) => void;
}

export default function useSelectableCertifications({ action }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const [selectedCertifications, setSelectedCertifications] = useState<
    Certification[]
  >([]);

  const toggleSelection = (certification: Certification) => {
    setSelectedCertifications((prev) =>
      prev.find(
        (prevCertification) => prevCertification.id === certification.id
      )
        ? prev.filter(
            (prevCertification) => prevCertification.id !== certification.id
          )
        : [...prev, certification]
    );
  };

  const handleAction = useCallback(() => {
    action(selectedCertifications);
    handleCloseModal(modalTypes.selectableCertificationsModal.name);
  }, [action, handleCloseModal, selectedCertifications]);
  return { selectedCertifications, toggleSelection, handleAction };
}
