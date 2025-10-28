import SectionsHeader from "@/components/sections-header/sections-header";
import { paths } from "@/routes/path";
import { Files } from "lucide-react";
import React from "react";
import CertificationGroupsListContainer from "./list/certification-groups-list-container";

export default function CertificationGroupsContainer() {
  return (
    <div className="flex flex-col gap-6">
      <SectionsHeader
        sectionIcon={<Files />}
        sectionTitle="Gestión de Grupos de Certificaciones"
        sectionDescription="Gestione los grupos certificaciones para organizar sus certificaciones"
        addButton={{
          buttonText: "Nuevo grupo de certificaciones",
          creationPath: paths.createCertificationGroup.root,
        }}
      />
      <CertificationGroupsListContainer />
    </div>
  );
}
