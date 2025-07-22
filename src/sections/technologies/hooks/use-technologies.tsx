"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import { Technology } from "@/lib/types/technologies";
import useTechonologiesFilters from "../filters/hooks/use-technologies-filters";
import { getTechnologiesList } from "@/lib/services/technologies";
import useClientPagination from "@/hooks/use-client-pagination";
import { Pagination } from "@/lib/types/pagination";

export default function useTechnologies() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const {
    pagination: clientPagination,
    setPagination: setClientPagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  } = useClientPagination();
  const [pagination, setPagination] = useState<Pagination>(clientPagination);
  const { filters, handleChangeFilters, handleResetFilters } =
    useTechonologiesFilters({ setPagination: setClientPagination });

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getTechnologiesList();

        if (res.error) throw new Error("Error al cargar las tecnologías");

        const technologies = res.data as Technology[];
        setTechnologies(technologies);

        setPagination({ ...clientPagination, total: technologies.length });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchTechnologies = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  return {
    technologies,
    loadingData,
    error,
    pagination,
    filters,
    fetchTechnologies,
    clientHandleChangePage,
    clientHandlePageSizeChange,
    handleChangeFilters,
    handleResetFilters,
  };
}
