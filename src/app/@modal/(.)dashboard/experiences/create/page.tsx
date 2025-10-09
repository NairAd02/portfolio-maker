import ExperienceCreateFormContainer from "@/sections/experiences/form/create/experience-create-form-container";
import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import React from "react";

export default function CreateExperience() {
  return (
    <ModalWrapper>
      <ExperienceCreateFormContainer />
    </ModalWrapper>
  );
}
