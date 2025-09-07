import DetailsSectionHeader from "@/components/details-section-header/details-section-header";
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

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <DetailsSectionHeader
        title="Detalles del Proyecto"
        description="Información detallada del proyecto registrado"
      />
      <ProjectDetailsContainer project={project} />;
    </div>
  );
}
