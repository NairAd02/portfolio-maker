import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import TechnologyCreateFormContainer from "@/sections/technologies/form/create/technology-create-form-container";
import React from "react";

export default function CreateTechnologyPage() {
  return (
    <ModalWrapper>
      <TechnologyCreateFormContainer />
    </ModalWrapper>
  );
}
