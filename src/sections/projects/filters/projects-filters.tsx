import { useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import SearchInput from "@/components/inputs/search-input/search-input";
import ListInput from "@/components/inputs/list-input/list-input";
import { OptionData } from "@/lib/types/filters";
import { ProjectsFilters as ProjectsFiltersType } from "./hooks/use-projects-filters";
import { Technology } from "@/lib/types/technologies";
import TextareaInput from "@/components/inputs/textarea-input/textarea-input";

interface Props {
  filters: ProjectsFiltersType;
  handleChangeFilters: (filters: Partial<ProjectsFiltersType>) => void;
  technologies: OptionData<Technology>;
}

export default function ProjectsFilters({
  filters,
  technologies,
  handleChangeFilters,
}: Props) {
  const handleTechnologiesChange = useCallback(
    (scentId: string, checked: boolean) => {
      const currentTech = filters.technologies || [];
      const newTech = checked
        ? [...currentTech, scentId]
        : currentTech.filter((id) => id !== scentId);

      handleChangeFilters({
        technologies: newTech.length > 0 ? newTech : [],
      });
    },
    [filters, handleChangeFilters]
  );

  return (
    <div className="space-y-6 p-4 overflow-auto">
      {/* Technologies */}
      <ListInput
        id="technologies"
        label="Tecnologías"
        values={filters.technologies}
        options={technologies.data.map((technology) => ({
          value: technology.id,
          label: technology.name,
        }))}
        loading={technologies.loading}
        handleValuesChange={handleTechnologiesChange}
      />
      <Separator className="bg-primary" />
      {/* Search for name */}
      <SearchInput
        id="name"
        label="Buscar por nombre"
        value={filters.name}
        placeHolder="Introduzca el nombre..."
        onChange={(e) => {
          handleChangeFilters({ name: e.target.value || undefined });
        }}
      />
      <TextareaInput
        id="description"
        label="Buscar por descripción"
        value={filters.description}
        placeHolder="Introduzca la descripción..."
        onChange={(e) => {
          handleChangeFilters({ description: e.target.value || undefined });
        }}
      />

      <TextareaInput
        id="problem"
        label="Buscar por problema"
        value={filters.problem}
        placeHolder="Introduzca el problema del proyecto..."
        onChange={(e) => {
          handleChangeFilters({ problem: e.target.value || undefined });
        }}
      />

      <TextareaInput
        id="impact"
        label="Buscar por impacto"
        value={filters.impact}
        placeHolder="Introduzca el impacto del proyecto..."
        onChange={(e) => {
          handleChangeFilters({ impact: e.target.value || undefined });
        }}
      />

      <TextareaInput
        id="solution"
        label="Buscar por solución"
        value={filters.solution}
        placeHolder="Introduzca la solución del proyecto..."
        onChange={(e) => {
          handleChangeFilters({ solution: e.target.value || undefined });
        }}
      />

      <TextareaInput
        id="teachings"
        label="Buscar por Aprendizaje"
        value={filters.teachings}
        placeHolder="Introduzca el aprendizaje del proyecto..."
        onChange={(e) => {
          handleChangeFilters({ teachings: e.target.value || undefined });
        }}
      />
    </div>
  );
}
