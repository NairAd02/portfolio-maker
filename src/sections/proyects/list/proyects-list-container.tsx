import React from "react";
import { getProyectsList } from "@/lib/services/proyects";
import { Proyect } from "@/lib/types/proyects";
import ProyectsList from "./proyects-list";

export default async function ProyectsListContainer() {
  const res = await getProyectsList();

  if (res.error) throw new Error("Error fetching proyects");
  const proyects = res.data as Proyect[];
  return <ProyectsList proyects={proyects} />;
}
