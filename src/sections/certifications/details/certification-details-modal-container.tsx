"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useCertification from "../hooks/use-certification";
import { CertificationDetailsContainer } from "./certification-details-container";

export default function CertificationDetailsModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.certificationDetailsModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { certification, loading, error, fetchCertification } =
    useCertification({ id });
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        certification && !error ? (
          <CertificationDetailsContainer certification={certification} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchCertification}
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
