import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import SkillGroupDeleteContainer from "@/sections/skill-groups/delete/skill-group-delete-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DeleteSkillGroupPage({ params }: Props) {
  const { id } = await params;

  return (
    <ModalWrapper>
      <SkillGroupDeleteContainer id={id} />
    </ModalWrapper>
  );
}
