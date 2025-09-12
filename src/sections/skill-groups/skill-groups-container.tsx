import SectionsHeader from "@/components/sections-header/sections-header";
import { paths } from "@/routes/path";
import { ChartNetwork } from "lucide-react";
import React from "react";
import SkillGroupsListContainer from "./list/skill-groups-list-container";

export default function SkillGroupsContainer() {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<ChartNetwork />}
        sectionTitle="Gestión de Grupos de Habilidades"
        sectionDescription="Gestione los grupos de habilidades de su repertorio"
        addButton={{
          isModalRedirect: false,
          buttonText: "Nuevo Grupo de Habilidades",
          creationPath: paths.createSkillGroup.root,
        }}
      />
      <SkillGroupsListContainer />
    </div>
  );
}
