import React from "react";
import { getProyectsList } from "@/lib/services/proyects";
import { Proyect } from "@/lib/types/proyects";
import ProjectsList from "./projects-list";

export default async function ProjectsListContainer() {
  const res = await getProyectsList();

  if (res.error) throw new Error("Error fetching proyects");
  const proyects = res.data as Proyect[];
  return <ProjectsList proyects={proyects} />;
}
