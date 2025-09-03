"use client";
import { urlToFile } from "@/lib/images";
import { useCallback, useEffect, useState } from "react";
import { Path, UseFormReturn } from "react-hook-form";

interface Props<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  images: string[];
  imageName: string;
  fieldName: Path<T>;
}

export default function useImagesForm<T extends Record<string, any>>({
  form,
  images,
  imageName,
  fieldName,
}: Props<T>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      form.setValue(
        fieldName,
        (await Promise.all(
          images.map(
            async (image, index) =>
              await urlToFile(image, imageName + " " + index)
          )
        )) as any
      );
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [images, imageName, fieldName, form]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return {
    loading,
    error,
    fetchImages,
  };
}
