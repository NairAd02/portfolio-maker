import { BlogCreate } from "@/sections/blogs/form/create/schemas/blog-create-schema";

export interface Blog {
  id: string;
  name: string;
  description: string;
  date: string;
  link?: string;
}

export interface BlogDetails {
  id: string;
  name: string;
  description: string;
  date: string;
  link?: string;
}

export interface BlogCreateDTO {
  name: string;
  description: string;
  date: string;
  link?: string;
}

export const convertBlogCreateDTO = (blog: BlogCreate): BlogCreateDTO => {
  return {
    ...blog,
    link: blog.link || undefined,
    date: blog.date.toISOString(),
  };
};
