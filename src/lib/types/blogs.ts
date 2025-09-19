import { BlogCreate } from "@/sections/blogs/form/create/schemas/blog-create-schema";
import { BlogEdit } from "@/sections/blogs/form/edit/schemas/blog-edit-schema";

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

export interface BlogEditDTO {
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

export const convertBlogEditDTO = (blog: BlogEdit): BlogEditDTO => {
  return {
    ...blog,
    link: blog.link || undefined,
    date: blog.date.toISOString(),
  };
};
