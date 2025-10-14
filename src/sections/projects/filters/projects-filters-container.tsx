"use client";
import React from "react";
import useProjectsFilters from "./hooks/use-projects-filters";
import ProjectsActiveFilters from "./components/projects-active-filters/projects-active-filters";
import ProjectsFilters from "./projects-filters";
import useTechnologies from "@/sections/technologies/hooks/use-technologies";
import SheetContainer from "@/components/ui/sheet-container";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

export default function ProjectsFiltersContainer() {
  const {
    filters,
    getActiveFiltersCount,
    handleChangeFilters,
    handleResetFilters,
  } = useProjectsFilters({ urlPagination: true });
  const { technologies, loadingData: loadingDataTechs } = useTechnologies();
  const activeFiltersCount = getActiveFiltersCount();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <SheetContainer
          title="Filtros de Proyectos"
          trigger={
            <Button className="flex items-center gap-2">
              {" "}
              <SlidersHorizontal /> Filtros
            </Button>
          }
        >
          <ProjectsFilters
            filters={filters}
            handleChangeFilters={handleChangeFilters}
            technologies={{
              data: technologies,
              loading: loadingDataTechs,
            }}
          />
        </SheetContainer>
      </div>
      {activeFiltersCount > 0 && (
        <ProjectsActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          activeFiltersCount={activeFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
