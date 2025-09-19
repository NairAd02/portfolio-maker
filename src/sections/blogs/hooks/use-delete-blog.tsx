"use client";

import { deleteBlog as deleteBlogService } from "@/lib/services/blogs";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteBlog({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteBlog = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      const res = await deleteBlogService(id);
      if (!res.data || res.error)
        setError(
          res.error.message || "Error durante la eliminación de la publicación"
        );
      else onDeleteAction();

      setLoading(false);
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteBlog };
}
