"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import useClientPagination from "@/hooks/use-client-pagination";
import { Pagination } from "@/lib/types/pagination";
import { Certification } from "@/lib/types/certifications";
import useCertificationsFilters from "../filters/hooks/use-certifications-filters";
import { getCertificationsList } from "@/lib/services/certifications";

export default function useCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
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
    useCertificationsFilters({ setPagination: setClientPagination });

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getCertificationsList();

        if (res.error) throw new Error("Error al cargar las certificaciones");

        const certifications = res.data as Certification[];
        setCertifications(certifications);

        setPagination({ ...clientPagination, total: certifications.length });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchCertifications = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  return {
    certifications,
    loadingData,
    error,
    pagination,
    filters,
    fetchCertifications,
    clientHandleChangePage,
    clientHandlePageSizeChange,
    handleChangeFilters,
    handleResetFilters,
  };
}
