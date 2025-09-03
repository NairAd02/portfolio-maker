"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import useProject from "../../hooks/use-project";
import ProjectEditFormContainer from "./project-edit-form-container";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";

export default function ProjectEditModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.editProyectModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { project, loading, error, fetchProject } = useProject({ id });
  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        project && !error ? (
          <ProjectEditFormContainer project={project} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchProject}
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
