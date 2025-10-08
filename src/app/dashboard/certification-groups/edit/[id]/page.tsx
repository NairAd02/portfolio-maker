import { getCertificationGroupById } from "@/lib/services/certification-groups";
import CertificationGroupEditFormContainer from "@/sections/certification-groups/form/edit/certification-group-edit-form-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCertificationGroupPage({ params }: Props) {
  const { id } = await params;
  const res = await getCertificationGroupById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención del grupo de certificaciones</div>;

  const certificationGroup = res.data;

  return (
    <CertificationGroupEditFormContainer
      certificationGroup={certificationGroup}
    />
  );
}
