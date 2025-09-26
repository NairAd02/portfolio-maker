"use client";
import { useCallback, useState } from "react";
import { editBlogsSection as editBlogsSectionService } from "@/lib/services/portfolio";
import { convertBlogsSectionDTO } from "@/lib/types/portfolio";
import { BlogsSectionSchema } from "../form/schemas/blogs-section-schema";

interface Props {
  onEditAction: () => void;
}

export default function useEditBlogsSection({ onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editBlogsSection = useCallback(
    async (blogsSection: BlogsSectionSchema) => {
      setLoading(true);
      setError(null);

      const res = await editBlogsSectionService(
        convertBlogsSectionDTO(blogsSection)
      );

      if (res.error) {
        console.log(res.error);
        setError(
          res.error.message || "Error en la edición de la sección de blogs"
        );
      } else {
        onEditAction();
      }

      setLoading(false);
    },
    [onEditAction]
  );
  return {
    loading,
    error,
    editBlogsSection,
  };
}
