import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import NewProjectFormModalContainer from "@/sections/projects/form/new/new-project-form-modal-container";
import ProjectsContainer from "@/sections/projects/projects-container";
import { FolderGit2 } from "lucide-react";

import React from "react";

export default async function ProjectsPage() {
  return (
    <>
      <ProjectsContainer />
      <Modal
        formPath={modalTypes.newProyectModal.name}
        icon={<FolderGit2 />}
        title={modalTypes.newProyectModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[90vh]"
      >
        <NewProjectFormModalContainer />
      </Modal>
    </>
  );
}
