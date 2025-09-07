import React from "react";
import ProjectsList from "./projects-list";
import { Project, ProjectsFiltersDTO } from "@/lib/types/projects";
import { getProjectsList } from "@/lib/services/projects";

interface Props {
  projectsFilters: ProjectsFiltersDTO;
}

export default async function ProjectsListContainer({
  projectsFilters,
}: Props) {
  const res = await getProjectsList(projectsFilters);

  if (res.error) throw new Error("Error fetching projects");
  const projects = res.data as Project[];
  return <ProjectsList projects={projects} />;
}
