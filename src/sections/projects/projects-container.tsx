import SectionsHeader from "@/components/sections-header/sections-header";
import { FolderGit2 } from "lucide-react";
import React from "react";
import ProjectsListContainer from "./list/projects-list-container";
import { paths } from "@/routes/path";
import { ProjectsFiltersDTO } from "@/lib/types/projects";

interface Props {
  projectsFilters: ProjectsFiltersDTO;
}

export default function ProjectsContainer({ projectsFilters }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <SectionsHeader
        sectionIcon={<FolderGit2 />}
        sectionTitle="Gestión de Proyectos"
        sectionDescription="Gestione los proyectos que ha realizado durante su decursar como profesional"
        addButton={{
          buttonText: "Nuevo Proyecto",
          creationPath: paths.createProject.root,
        }}
      />
      <ProjectsListContainer projectsFilters={projectsFilters} />
    </div>
  );
}
