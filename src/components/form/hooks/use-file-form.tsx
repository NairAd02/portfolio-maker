"use client";
import { urlToDocumentFile } from "@/lib/images";
import { useCallback, useEffect, useRef, useState } from "react";
import { Path, UseFormReturn } from "react-hook-form";

interface Props<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  fileUrl?: string;
  fileName: string;
  fieldName: Path<T>;
}

export default function useFileForm<T extends Record<string, any>>({
  form,
  fileUrl,
  fileName,
  fieldName,
}: Props<T>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasProcessed = useRef(false);

  // Usar useRef para almacenar valores que no deben trigger re-renders
  const fieldNameRef = useRef(fieldName);
  const fileUrlRef = useRef(fileUrl);
  const fileNameRef = useRef(fileName);

  const fetchFile = useCallback(async () => {
    if (hasProcessed.current) return;

    try {
      setLoading(true);
      const currentValue = form.getValues(fieldNameRef.current);

      if (!currentValue && fileUrlRef.current) {
        hasProcessed.current = true;
        const file = await urlToDocumentFile(fileUrlRef.current, fileNameRef.current);
        form.setValue(fieldNameRef.current, file as any, {
          shouldDirty: false,
          shouldValidate: false,
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    fetchFile();
  }, [fetchFile]);

  return {
    loading,
    error,
    fetchFile,
  };
}
