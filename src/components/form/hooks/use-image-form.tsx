"use client";
import { urlToFile } from "@/lib/images";
import { useCallback, useEffect, useRef, useState } from "react";
import { Path, UseFormReturn } from "react-hook-form";

interface Props<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  imageUrl?: string;
  imageName: string;
  fieldName: Path<T>;
}

export default function useImageForm<T extends Record<string, any>>({
  form,
  imageUrl,
  imageName,
  fieldName,
}: Props<T>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasProcessed = useRef(false);

  // Usar useRef para almacenar valores que no deben trigger re-renders
  const fieldNameRef = useRef(fieldName);
  const imageUrlRef = useRef(imageUrl);
  const imageNameRef = useRef(imageName);

  const fetchImage = useCallback(async () => {
    if (hasProcessed.current) return;

    try {
      setLoading(true);
      const currentValue = form.getValues(fieldNameRef.current);

      if (!currentValue && imageUrlRef.current) {
        hasProcessed.current = true;
        const file = await urlToFile(imageUrlRef.current, imageNameRef.current);
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
    fetchImage();
  }, [fetchImage]);

  return {
    loading,
    error,
    fetchImage,
  };
}
