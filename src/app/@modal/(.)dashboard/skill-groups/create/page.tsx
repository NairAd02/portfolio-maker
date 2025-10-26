import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import SkillGroupCreateFormContainer from "@/sections/skill-groups/form/create/skill-group-create-form-container";
import React from "react";

export default function CreateSkillGroupPage() {
  return (
    <ModalWrapper modalClassName="max-w-3xl">
      <SkillGroupCreateFormContainer />
    </ModalWrapper>
  );
}
