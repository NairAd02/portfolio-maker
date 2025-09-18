import { getCertificationGroupById } from "@/lib/services/certification-groups";
import CertificationGroupDetailsContainer from "@/sections/certification-groups/details/certification-group-details-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CertificationGroupDetailsPage({ params }: Props) {
  const { id } = await params;
  const res = await getCertificationGroupById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención del grupo de certificaciones</div>;

  const certificationGroup = res.data;

  return (
    <CertificationGroupDetailsContainer
      certificationGroup={certificationGroup}
    />
  );
}
