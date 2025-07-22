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
      form.setValue(
        fieldName,
        imageUrl ? ((await urlToFile(imageUrl, imageName)) as any) : undefined
      );
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      console.log("Ya paré");
      setLoading(false);
    }
  }, [imageUrl, imageName, fieldName, form]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  return {
    loading,
    error,
    fetchImage,
  };
}
