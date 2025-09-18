"use server";

import { createClient } from "../supabase/server";
import { Blog } from "../types/blogs";

export async function getBlogsList() {
  const supabase = await createClient();
  const { data: blogsData, error } = await supabase.from("blog").select("*");
  const blogs = blogsData as Blog[];

  return { data: blogs, error };
}
