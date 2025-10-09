import CertificationCreateFormContainer from "@/sections/certifications/form/create/certification-create-form-container";
import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import React from "react";

export default function CreateCertificationPage() {
  return (
    <ModalWrapper>
      <CertificationCreateFormContainer />
    </ModalWrapper>
  );
}
