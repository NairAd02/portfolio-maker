import SectionsHeader from "@/components/sections-header/sections-header";
import { paths } from "@/routes/path";
import { ScrollText } from "lucide-react";
import React from "react";
import CertificationsListContainer from "./list/certifications-list-container";

export default function CertificationsContainer() {
  return (
    <div className="flex flex-col gap-6">
      <SectionsHeader
        sectionIcon={<ScrollText />}
        sectionTitle="Gestión de Certificaciones"
        sectionDescription="Gestione las certificaciones que ha obtenido a lo largo de su trayectoria"
        addButton={{
          isModalRedirect: false,
          buttonText: "Nueva Certificación",
          creationPath: paths.createCertification.root,
        }}
      />
      <CertificationsListContainer />
    </div>
  );
}
