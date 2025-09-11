import React from "react";
import { getSkillGroupsList } from "@/lib/services/skill-groups";
import { SkillGroup } from "@/lib/types/skill-groups";
import SkillGroupsList from "./skill-groups-list";

export default async function SkillGroupsListContainer() {
  const res = await getSkillGroupsList();

  if (res.error) throw new Error("Error fetching skill groups");
  const skillGroups = res.data as SkillGroup[];
  return <SkillGroupsList skillGroups={skillGroups} />;
}
