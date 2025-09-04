import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import ProjectEditModalContainer from "@/sections/projects/form/edit/project-edit-modal-container";
import ProjectsContainer from "@/sections/projects/projects-container";
import { FolderGit2 } from "lucide-react";

import React from "react";

export default async function ProjectsPage() {
  return (
    <>
      <ProjectsContainer />
      <Modal
        formPath={modalTypes.editProyectModal.name}
        icon={<FolderGit2 />}
        title={modalTypes.editProyectModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[90vh]"
      >
        <ProjectEditModalContainer />
      </Modal>
    </>
  );
}
