import { getTechnologyById } from "@/lib/services/technologies";
import TechnologyEditFormContainer from "@/sections/technologies/form/edit/technology-edit-form-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTechnologyPage({ params }: Props) {
  const { id } = await params;
  const res = await getTechnologyById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención de la tecnología</div>;

  const technology = res.data;

  return <TechnologyEditFormContainer technology={technology} />;
}
