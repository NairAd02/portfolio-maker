import ExperienceDeleteContainer from "@/sections/experiences/delete/experience-delete-container";
import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DeleteExperiencePage({ params }: Props) {
  const { id } = await params;
  return (
    <ModalWrapper>
      <ExperienceDeleteContainer id={id} />
    </ModalWrapper>
  );
}
