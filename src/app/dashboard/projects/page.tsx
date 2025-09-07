import { ProjectsFiltersDTO } from "@/lib/types/projects";
import ProjectsContainer from "@/sections/projects/projects-container";

import React from "react";

type Props = {
  searchParams: Promise<ProjectsFiltersDTO>;
};

export default async function ProjectsPage({ searchParams }: Props) {
  const projectsFilters = await searchParams;
  return (
    <>
      <ProjectsContainer projectsFilters={projectsFilters} />
    </>
  );
}
