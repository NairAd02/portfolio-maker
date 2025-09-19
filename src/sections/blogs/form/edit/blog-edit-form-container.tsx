"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import FormActionButtons from "@/components/form/components/form-action-buttons";
import { useRouter } from "next/navigation";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import BlogForm from "../blog-form";
import useEditBlog from "../../hooks/use-edit-blog";
import { BlogDetails } from "@/lib/types/blogs";
import { BlogEdit, blogEditSchema } from "./schemas/blog-edit-schema";

interface Props {
  blog: BlogDetails;
}

export default function BlogEditFormContainer({ blog }: Props) {
  const router = useRouter();
  const {
    loading: submitLoading,
    editBlog,
    error: editBlogError,
  } = useEditBlog({
    id: blog.id,
    onEditAction: () => {
      toast.success("Blog editado con éxito");
      revalidateServerPath(paths.blogs.root);
      handleClose();
      router.refresh();
    },
  });
  const form = useForm<BlogEdit>({
    resolver: zodResolver(blogEditSchema),
    defaultValues: {
      name: blog.name,
      description: blog.description,
      date: new Date(blog.date),
      link: blog.link || "",
    },
  });

  const handleClose = () => {
    router.back();
  };

  function onSubmit(blog: BlogEdit) {
    editBlog(blog);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {editBlogError && <AlertDestructive title={editBlogError} />}
        <BlogForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Editar Publicación"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
