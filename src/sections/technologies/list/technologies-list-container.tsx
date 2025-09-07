import React from "react";
import { getTechnologiesList } from "@/lib/services/technologies";
import { Technology } from "@/lib/types/technologies";
import TechnologiesList from "./technologies-list";

export default async function TechnologiesListContainer() {
  const res = await getTechnologiesList();

  if (res.error) throw new Error("Error fetching technologies");
  const technologies = res.data as Technology[];
  return <TechnologiesList technologies={technologies} />;
}
