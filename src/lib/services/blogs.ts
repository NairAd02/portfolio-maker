"use server";

import { createClient } from "../supabase/server";
import { Blog, BlogCreateDTO, BlogDetails, BlogEditDTO } from "../types/blogs";
import { getLoggedUser } from "./auth";

export async function getBlogsList() {
  const supabase = await createClient();
  const { data: blogsData, error } = await supabase.from("blog").select("*");
  const blogs = blogsData as Blog[];

  return { data: blogs, error };
}

export async function getBlogById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return { data: null, error };

  const blog = data as BlogDetails;

  return {
    data: blog,
    error: null,
  };
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

export async function editBlog(id: string, blogEditDTO: BlogEditDTO) {
  const supabase = await createClient();

  // find the blog to edit
  const { error: blogFindError } = await supabase
    .from("blog")
    .select("*")
    .eq("id", id)
    .single();

  if (blogFindError) return { data: null, error: blogFindError };

  const { data: updateBlogData, error: updateBlogError } = await supabase
    .from("blog")
    .update({
      ...blogEditDTO,
    })
    .eq("id", id)
    .select()
    .single();
  if (updateBlogError) return { data: null, error: updateBlogError };

  return { data: updateBlogData, error: null };
}

export async function deleteBlog(id: string) {
  const supabase = await createClient();

  // find the blog to delete
  const { error: blogFindError } = await supabase
    .from("blog")
    .select("*")
    .eq("id", id)
    .single();

  if (blogFindError) return { data: null, error: blogFindError };

  const { error } = await supabase.from("blog").delete().eq("id", id);

  if (error) return { data: null, error };

  return { data: { message: "Publicación eliminada con éxito" }, error: null };
}
