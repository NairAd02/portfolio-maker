"use server";

import { createClient } from "../supabase/server";
import { Blog, BlogCreateDTO } from "../types/blogs";
import { getLoggedUser } from "./auth";

export async function getBlogsList() {
  const supabase = await createClient();
  const { data: blogsData, error } = await supabase.from("blog").select("*");
  const blogs = blogsData as Blog[];

  return { data: blogs, error };
}

export async function createBlog(blogCreateDTO: BlogCreateDTO) {
  const supabase = await createClient();

  // get the session
  const { data: sessionData, error: loggedUserError } = await getLoggedUser();

  if (!sessionData || loggedUserError) return { data: null, loggedUserError };

  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select("id")
    .eq("user_id", sessionData.user.id)
    .single();

  if (portfolioError) return { data: null, error: portfolioError };

  const { data: createBlogData, error: createBlogError } = await supabase
    .from("blog")
    .insert({
      ...blogCreateDTO,
      portfolio_id: portfolio.id,
    })
    .select()
    .single();

  if (createBlogError) return { data: null, error: createBlogError };

  return { data: createBlogData, error: null };
}
