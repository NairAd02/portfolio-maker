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
import useCreateBlog from "../../hooks/use-create-blog";
import { BlogCreate, blogCreateSchema } from "./schemas/blog-create-schema";
import BlogForm from "../blog-form";

export default function BlogCreateFormContainer() {
  const router = useRouter();
  const {
    loading: submitLoading,
    createBlog,
    error: createBlogError,
  } = useCreateBlog({
    onCreateAction: () => {
      toast.success("Blog creado con éxito");
      revalidateServerPath(paths.blogs.root);
      handleClose();
      router.refresh();
    },
  });
  const form = useForm<BlogCreate>({
    resolver: zodResolver(blogCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      link: "",
    },
  });

  const handleClose = () => {
    router.back();
  };

  function onSubmit(blog: BlogCreate) {
    createBlog(blog);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {createBlogError && <AlertDestructive title={createBlogError} />}
        <BlogForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Crear Publicación"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
