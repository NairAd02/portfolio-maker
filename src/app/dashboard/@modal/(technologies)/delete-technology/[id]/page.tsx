import TechnologyDeleteContainer from "@/sections/technologies/delete/project-delete-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DeleteTechnologyPage({ params }: Props) {
  const { id } = await params;

  return <TechnologyDeleteContainer id={id} />;
}
