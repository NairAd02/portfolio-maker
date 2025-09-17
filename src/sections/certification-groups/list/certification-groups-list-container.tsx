import React from "react";
import { getCertificationGroupsList } from "@/lib/services/certification-groups";
import CertificationGroupsList from "./certification-groups-list";

export default async function CertificationGroupsListContainer() {
  const res = await getCertificationGroupsList();

  if (res.error) throw new Error("Error fetching certification groups");
  const certificationGroups = res.data;
  return <CertificationGroupsList certificationGroups={certificationGroups} />;
}
