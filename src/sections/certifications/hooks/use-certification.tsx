"use client";

import { getCertificationById } from "@/lib/services/certifications";
import { CertificationDetails } from "@/lib/types/certifications";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useCertification({ id }: Props) {
  const [certification, setCertification] =
    useState<CertificationDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchCertification = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getCertificationById(id);

        if (!res.data || res.error)
          throw new Error("Error al cargar la información de la certificación");

        setCertification(res.data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchCertification();
  }, [fetchCertification]);
  return { certification, error, loading, fetchCertification };
}
