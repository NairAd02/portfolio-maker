import { getCertificationById } from "@/lib/services/certifications";
import CertificationEditFormContainer from "@/sections/certifications/form/edit/certification-edit-form-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCertificationPage({ params }: Props) {
  const { id } = await params;
  const res = await getCertificationById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención de la certificación</div>;

  const certification = res.data;

  return <CertificationEditFormContainer certification={certification} />;
}
