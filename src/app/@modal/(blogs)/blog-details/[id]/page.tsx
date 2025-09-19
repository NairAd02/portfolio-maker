import { getBlogById } from "@/lib/services/blogs";
import { BlogDetailsContainer } from "@/sections/blogs/details/blog-details-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BlogDetailsPage({ params }: Props) {
  const { id } = await params;
  const res = await getBlogById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención de la publicación</div>;

  const blog = res.data;

  return <BlogDetailsContainer blog={blog} />;
}
