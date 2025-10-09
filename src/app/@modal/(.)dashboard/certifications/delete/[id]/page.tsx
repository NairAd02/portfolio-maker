import CertificationDeleteContainer from "@/sections/certifications/delete/certification-delete-container";
import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DeleteCertificationPage({ params }: Props) {
  const { id } = await params;
  return (
    <ModalWrapper>
      <CertificationDeleteContainer id={id} />
    </ModalWrapper>
  );
}
