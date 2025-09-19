"use client";
import { useCallback, useState } from "react";
import { BlogEdit } from "../form/edit/schemas/blog-edit-schema";
import { editBlog as editBlogService } from "@/lib/services/blogs";
import { convertBlogEditDTO } from "@/lib/types/blogs";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditBlog({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editBlog = useCallback(
    async (blog: BlogEdit) => {
      setLoading(true);
      setError(null);

      const res = await editBlogService(id, convertBlogEditDTO(blog));

      if (res.error)
        setError(res.error.message || "Error en la edición del blog");
      else {
        onEditAction();
      }

      setLoading(false);
    },
    [onEditAction, id]
  );
  return {
    loading,
    error,
    editBlog,
  };
}
