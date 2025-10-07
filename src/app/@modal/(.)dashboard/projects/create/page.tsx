import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import ProjectCreateFormContainer from "@/sections/projects/form/new/project-create-form-containter";
import React from "react";

export default function CreateProyectPage() {
  return (
    <ModalWrapper>
      <ProjectCreateFormContainer />
    </ModalWrapper>
  );
}
