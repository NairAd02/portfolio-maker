import { getSkillGroupById } from "@/lib/services/skill-groups";
import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import SkillGroupEditFormContainer from "@/sections/skill-groups/form/edit/skill-group-edit-form-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditSkillGroupPage({ params }: Props) {
  const { id } = await params;
  const res = await getSkillGroupById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención del grupo de habilidades</div>;

  const skillGroup = res.data;

  return (
    <ModalWrapper>
      <SkillGroupEditFormContainer skillGroup={skillGroup} />
    </ModalWrapper>
  );
}
