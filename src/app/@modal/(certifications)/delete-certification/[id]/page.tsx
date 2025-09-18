import CertificationDeleteContainer from "@/sections/certifications/delete/certification-delete-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DeleteCertificationPage({ params }: Props) {
  const { id } = await params;
  return <CertificationDeleteContainer id={id} />;
}
