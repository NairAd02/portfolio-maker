import React from "react";
import { getCertificationsList } from "@/lib/services/certifications";
import { Certification } from "@/lib/types/certifications";
import CertificationsList from "./certifications-list";

export default async function CertificationsListContainer() {
  const res = await getCertificationsList();

  if (res.error) throw new Error("Error fetching certifications");
  const certifications = res.data as Certification[];
  return <CertificationsList certifications={certifications} />;
}
