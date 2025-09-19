import { getBlogById } from "@/lib/services/blogs";
import BlogEditFormContainer from "@/sections/blogs/form/edit/blog-edit-form-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const res = await getBlogById(id);

  if (!res.data || res.error)
    return <div>Error en la obtención de la publicación</div>;

  const blog = res.data;

  return <BlogEditFormContainer blog={blog} />;
}
