import SectionsHeader from "@/components/sections-header/sections-header";
import { paths } from "@/routes/path";
import { BriefcaseBusiness } from "lucide-react";
import React from "react";
import ExperiencesListContainer from "./list/experiences-list-container";

export default function ExperiencesContainer() {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<BriefcaseBusiness />}
        sectionTitle="Gestión de Experiencias Laborales"
        sectionDescription="Gestione las experiencias laborales que haya vivido como Informático"
        addButton={{
          isModalRedirect: false,
          buttonText: "Nueva Experiencia",
          creationPath: paths.createTechnology.root,
        }}
      />
      <ExperiencesListContainer />
    </div>
  );
}
