import { getExperienceById } from "@/lib/services/experiences";
import ExperienceEditFormContainer from "@/sections/experiences/form/edit/experience-edit-form-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params;
  const res = await getExperienceById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención de la experiencia laboral</div>;

  const experience = res.data;

  return <ExperienceEditFormContainer experience={experience} />;
}
