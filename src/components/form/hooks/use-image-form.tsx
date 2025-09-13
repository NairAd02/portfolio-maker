"use client";
import { urlToFile } from "@/lib/images";
import { useCallback, useEffect, useState } from "react";
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

  const fetchImage = useCallback(async () => {
    try {
      setLoading(true);

      const currentValue = form.getValues(fieldName);
      if (!currentValue && imageUrl) {
        const file = await urlToFile(imageUrl, imageName);
        form.setValue(fieldName, file as any);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [imageUrl, imageName, fieldName, form]);

  useEffect(() => {
    const currentValue = form.getValues(fieldName);
    if (imageUrl && !currentValue) {
      fetchImage();
    } else {
      setLoading(false);
    }
  }, [imageUrl, fieldName, form, fetchImage]);

  return {
    loading,
    error,
    fetchImage,
  };
}
