"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import useCertifications from "../../hooks/use-certifications";
import { Certification } from "@/lib/types/certifications";
import SelectableCertifications from "./selectable-certifications";

export default function SelectableCertificationsModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.selectableCertificationsModal.name);
  const selectedCertifications =
    infoModal && infoModal.elements
      ? (infoModal.elements as Certification[])
      : null;
  const action =
    infoModal && infoModal.actionInsert ? infoModal.actionInsert : null;
  const { certifications, loadingData, error, fetchCertifications } =
    useCertifications();
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loadingData ? (
        !error ? (
          <SelectableCertifications
            certifications={certifications.filter(
              (certification) =>
                !selectedCertifications?.some(
                  (selectedCertification) =>
                    certification.id === selectedCertification.id
                )
            )}
            action={action as (certifications: Certification[]) => void}
          />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchCertifications}
          />
        )
      ) : (
        <div className="flex justify-center flex-1 items-center h-full w-full">
          <LoadingSpinner size={100} />
        </div>
      )}
    </div>
  );
}
