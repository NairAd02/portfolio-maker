"use client";

import useUrlFilters from "@/hooks/use-url-filters";
import { Pagination } from "@/lib/types/pagination";
import { convertProjectsFiltersDTO } from "@/lib/types/projects";
import { Dispatch, SetStateAction, useState } from "react";

export interface ProjectsFilters {
  name?: string;
  description?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  teachings?: string;
  technologies: string[];
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
  defaultsFilters?: ProjectsFilters;
  urlPagination?: boolean;
}

export default function useProjectsFilters({
  setPagination,
  defaultsFilters = { technologies: [] },
  urlPagination = false,
}: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<ProjectsFilters>(defaultsFilters);

  async function handleChangeFilters(updatedFilters: Partial<ProjectsFilters>) {
    const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    if (urlPagination)
      updateFiltersInUrl({
        ...convertProjectsFiltersDTO(newFilters),
        technologies:
          newFilters.technologies.length > 0
            ? newFilters.technologies
            : undefined,
      });
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  function handleResetFilters() {
    setFilters({ technologies: [] });
    if (urlPagination) updateFiltersInUrl({});
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.name) count++;
    if (filters.description) count++;
    if (filters.problem) count++;
    if (filters.impact) count++;
    if (filters.teachings) count++;
    if (filters.solution) count++;

    return count;
  };

  return {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  };
}
