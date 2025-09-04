import SectionsHeader from "@/components/sections-header/sections-header";
import { FolderGit2 } from "lucide-react";
import React from "react";
import ProjectsListContainer from "./list/projects-list-container";
import { paths } from "@/routes/path";

export default function ProjectsContainer() {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<FolderGit2 />}
        sectionTitle="Gestión de Proyectos"
        sectionDescription="Gestione los proyectos que ha realizado durante su decursar como profesional"
        addButton={{
          isModalRedirect: false,
          buttonText: "Nuevo Proyecto",
          creationPath: paths.createProject.root,
        }}
      />
      <ProjectsListContainer />
    </div>
  );
}
