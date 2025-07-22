import React from "react";

import ProjectsList from "./projects-list";
import { Project } from "@/lib/types/projects";
import { getProjectsList } from "@/lib/services/projects";

export default async function ProjectsListContainer() {
  const res = await getProjectsList();

  if (res.error) throw new Error("Error fetching projects");
  const proyects = res.data as Project[];
  return <ProjectsList proyects={proyects} />;
}
