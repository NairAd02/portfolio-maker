import CertificationGroupDeleteContainer from "@/sections/certification-groups/delete/certification-group-delete-container";

import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DeleteCertificationGroupPage({ params }: Props) {
  const { id } = await params;
  return <CertificationGroupDeleteContainer id={id} />;
}
