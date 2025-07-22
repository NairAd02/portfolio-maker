import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import NewProjectFormModalContainer from "@/sections/proyects/form/new/new-project-form-modal-container";
import ProyectsContainer from "@/sections/proyects/proyects-container";
import React from "react";

export default async function ProyectsPage() {
  return (
    <>
      <ProyectsContainer />
      <Modal
        formPath={modalTypes.newProyectModal.name}
        title={modalTypes.newProyectModal.title}
        maxWidth="max-w-3xl"
        className="max-h-[90vh] min-h-[90vh]"
      >
        <NewProjectFormModalContainer />
      </Modal>
    </>
  );
}
