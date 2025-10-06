import SectionsHeader from "@/components/sections-header/sections-header";
import { paths } from "@/routes/path";
import { Cpu } from "lucide-react";
import React from "react";
import TechnologiesListContainer from "./list/technologies-list-container";

export default function TechnologiesContainer() {
  return (
    <div className="flex flex-col gap-6">
      <SectionsHeader
        sectionIcon={<Cpu />}
        sectionTitle="Gestión de Tecnologías"
        sectionDescription="Gestione las tecnologías que quiera incluir en el dominio de su repertorio"
        addButton={{
          isModalRedirect: false,
          buttonText: "Nueva Tecnología",
          creationPath: paths.createTechnology.root,
        }}
      />
      <TechnologiesListContainer />
    </div>
  );
}
