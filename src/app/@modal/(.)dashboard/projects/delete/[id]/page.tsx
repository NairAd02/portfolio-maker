import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import ProjectDeleteContainer from "@/sections/projects/delete/project-delete-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DeleteProjectPage({ params }: Props) {
  const { id } = await params;

  return (
    <ModalWrapper>
      <ProjectDeleteContainer id={id} />
    </ModalWrapper>
  );
}
