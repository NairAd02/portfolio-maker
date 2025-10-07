import BlogDeleteContainer from "@/sections/blogs/delete/blog-delete-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DeleteBlogPage({ params }: Props) {
  const { id } = await params;
  return <BlogDeleteContainer id={id} />;
}
