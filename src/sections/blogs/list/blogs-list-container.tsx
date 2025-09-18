import React from "react";
import { getBlogsList } from "@/lib/services/blogs";
import { Blog } from "@/lib/types/blogs";
import BlogsList from "./blogs-list";

export default async function BlogsListContainer() {
  const res = await getBlogsList();

  if (res.error) throw new Error("Error fetching blogs");
  const blogs = res.data as Blog[];
  return <BlogsList blogs={blogs} />;
}
