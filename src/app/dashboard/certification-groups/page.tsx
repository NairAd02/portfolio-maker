import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import CertificationGroupsContainer from "@/sections/certification-groups/certification-groups-container";
import SelectableCertificationsModalContainer from "@/sections/certifications/components/selectable-certifications/selectable-certifications-modal-container";
import React from "react";

export default function CertificationGroupsPage() {
  return (
    <>
      <CertificationGroupsContainer />
      <Modal formPath={modalTypes.selectableCertificationsModal.name}>
        <SelectableCertificationsModalContainer />
      </Modal>
    </>
  );
}
