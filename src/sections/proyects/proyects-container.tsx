import SectionsHeader from "@/components/sections-header/sections-header";
import { FileCogIcon } from "lucide-react";
import React from "react";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { getProyectsList } from "@/lib/services/proyects";
import ProyectsListContainer from "./list/proyects-list-container";



export default function ProyectsContainer() {
  getProyectsList();
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<FileCogIcon />}
        sectionTitle="Gestión de Proyectos"
        sectionDescription="Gestione los proyectos que ha realizado durante su decursar como profesional"
        addButton={{
          isModalRedirect: true,
          buttonText: "Nuevo Proyecto",
          creationPath: modalTypes.newProyectModal.name,
        }}
      />
      <ProyectsListContainer />
    </div>
  );
}
