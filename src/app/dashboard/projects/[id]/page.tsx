import { getProjectById } from "@/lib/services/projects";
import { ProjectDetailsContainer } from "@/sections/projects/details/project-details-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailsPage({ params }: Props) {
  const { id } = await params;
  const res = await getProjectById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención del proyecto</div>;

  const project = res.data;

  return <ProjectDetailsContainer project={project} />;
}
