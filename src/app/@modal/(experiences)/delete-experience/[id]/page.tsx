import ExperienceDeleteContainer from "@/sections/experiences/delete/experience-delete-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DeleteExperiencePage({ params }: Props) {
  const { id } = await params;
  return <ExperienceDeleteContainer id={id} />;
}
