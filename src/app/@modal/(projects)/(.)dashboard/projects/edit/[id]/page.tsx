import { getProjectById } from "@/lib/services/projects";
import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import ProjectEditFormContainer from "@/sections/projects/form/edit/project-edit-form-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const res = await getProjectById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención del proyecto</div>;

  const project = res.data;

  return (
    <ModalWrapper>
      <ProjectEditFormContainer project={project} />
    </ModalWrapper>
  );
}
