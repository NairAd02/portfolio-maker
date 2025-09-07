import { Label } from "@/components/ui/label";
import React from "react";
import FilterBadge from "@/components/filters/filter-badge/filter-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcwIcon } from "lucide-react";
import { ProjectsFilters } from "../../hooks/use-projects-filters";

interface Props {
  filters: ProjectsFilters;
  handleChangeFilters: (filters: Partial<ProjectsFilters>) => void;
  getActiveFiltersCount: () => number;
  handleResetFilters: () => void;
}

export default function ProjectsActiveFilters({
  filters,
  handleChangeFilters,
  getActiveFiltersCount,
  handleResetFilters,
}: Props) {
  return (
    <div>
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <Label>Filtros Activos</Label>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="default" className="ml-2">
              {getActiveFiltersCount()}
            </Badge>
          )}
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="h-8"
            >
              <RotateCcwIcon className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.name && (
            <FilterBadge
              filterName="Nombre"
              filterValue={filters.name}
              handleDeleteFilter={() => {
                handleChangeFilters({ name: undefined });
              }}
            />
          )}
          {filters.description && (
            <FilterBadge
              filterName="Descripción"
              filterValue={filters.description}
              handleDeleteFilter={() => {
                handleChangeFilters({ description: undefined });
              }}
            />
          )}
          {filters.problem && (
            <FilterBadge
              filterName="Problema"
              filterValue={filters.problem}
              handleDeleteFilter={() => {
                handleChangeFilters({ problem: undefined });
              }}
            />
          )}
          {filters.impact && (
            <FilterBadge
              filterName="Impacto"
              filterValue={filters.impact}
              handleDeleteFilter={() => {
                handleChangeFilters({ impact: undefined });
              }}
            />
          )}
          {filters.solution && (
            <FilterBadge
              filterName="Solución"
              filterValue={filters.solution}
              handleDeleteFilter={() => {
                handleChangeFilters({ solution: undefined });
              }}
            />
          )}
          {filters.teachings && (
            <FilterBadge
              filterName="Aprendizaje"
              filterValue={filters.teachings}
              handleDeleteFilter={() => {
                handleChangeFilters({ teachings: undefined });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
