import { getCertificationById } from "@/lib/services/certifications";
import { CertificationDetailsContainer } from "@/sections/certifications/details/certification-details-container";
import ModalWrapper from "@/sections/modal-page/components/modal-wrapper/modal-wrapper";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CertificationDetailsPage({ params }: Props) {
  const { id } = await params;
  const res = await getCertificationById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención de la certificación</div>;

  const certification = res.data;

  return (
    <ModalWrapper>
      <CertificationDetailsContainer certification={certification} />
    </ModalWrapper>
  );
}
