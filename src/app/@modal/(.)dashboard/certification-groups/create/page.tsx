import CertificationGroupCreateFormContainer from "@/sections/certification-groups/form/create/certification-group-create-form-container";
import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import React from "react";

export default function CreateCertificationGroupPage() {
  return (
    <ModalWrapper>
      <CertificationGroupCreateFormContainer />
    </ModalWrapper>
  );
}
