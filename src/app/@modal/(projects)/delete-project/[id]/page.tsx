import ProjectDeleteContainer from "@/sections/projects/delete/project-delete-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DeleteProjectPage({ params }: Props) {
  const { id } = await params;

  return <ProjectDeleteContainer id={id} />;
}
