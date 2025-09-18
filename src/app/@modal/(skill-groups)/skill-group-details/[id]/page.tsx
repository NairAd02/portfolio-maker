import { getSkillGroupById } from "@/lib/services/skill-groups";
import SkillGroupDetailsContainer from "@/sections/skill-groups/details/skill-group-details-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SkillGroupDetailsPage({ params }: Props) {
  const { id } = await params;
  const res = await getSkillGroupById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención del grupo de habilidades</div>;

  const skillGroup = res.data;

  return <SkillGroupDetailsContainer skillGroup={skillGroup} />;
}
