"use client";
import { useCallback, useState } from "react";
import { BlogCreate } from "../form/create/schemas/blog-create-schema";
import { createBlog as createBlogService } from "@/lib/services/blogs";
import { convertBlogCreateDTO } from "@/lib/types/blogs";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateBlog({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBlog = useCallback(
    async (blog: BlogCreate) => {
      setLoading(true);
      setError(null);

      const res = await createBlogService(convertBlogCreateDTO(blog));

      if (res.error) {
        console.log(res.error);
        setError(res.error.message || "Error en la creación del blog");
      } else {
        onCreateAction();
      }

      setLoading(false);
    },
    [onCreateAction]
  );
  return {
    loading,
    error,
    createBlog,
  };
}
