import React from "react";
import { getExperiencesList } from "@/lib/services/experiences";
import { Experience } from "@/lib/types/experiences";
import ExperiencesList from "./experiences-list";

export default async function ExperiencesListContainer() {
  const res = await getExperiencesList();

  if (res.error) throw new Error("Error fetching experiences");
  const experiences = res.data as Experience[];
  return <ExperiencesList experiences={experiences} />;
}
