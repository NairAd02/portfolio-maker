import { getExperienceById } from "@/lib/services/experiences";
import ExperienceDetailsContainer from "@/sections/experiences/details/experience-details-container";

import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ExperienceDetailsPage({ params }: Props) {
  const { id } = await params;
  const res = await getExperienceById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención de la experiencia laboral</div>;

  const experience = res.data;

  return <ExperienceDetailsContainer experience={experience} />;
}
