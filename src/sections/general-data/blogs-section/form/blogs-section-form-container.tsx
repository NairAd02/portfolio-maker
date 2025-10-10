"use client";
import SubmitButton from "@/components/form/components/submit-button";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { revalidateServerPath } from "@/lib/cache";
import { paths } from "@/routes/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogsSectionReport } from "@/lib/types/portfolio";
import useEditBlogsSection from "../hooks/use-edit-blogs-section";
import {
  blogsSectionSchema,
  BlogsSectionSchema,
} from "./schemas/blogs-section-schema";
import BlogsSectionForm from "./blogs-section-form";

interface Props {
  blogsSectionReport: BlogsSectionReport;
}

export default function BlogsSectionFormContainer({
  blogsSectionReport,
}: Props) {
  const {
    loading: submitLoading,
    editBlogsSection,
    error: editBlogsSectionError,
  } = useEditBlogsSection({
    onEditAction: () => {
      toast.success("Sección de blogs editada con éxito");
      revalidateServerPath(paths.generalData.blogsSection);
    },
  });
  const form = useForm<BlogsSectionSchema>({
    resolver: zodResolver(blogsSectionSchema),
    defaultValues: {
      blog_and_post_text: blogsSectionReport.blog_and_post_text || "",
    },
  });

  function onSubmit(blogsSection: BlogsSectionSchema) {
    editBlogsSection(blogsSection);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-8 h-full"
      >
        {editBlogsSectionError && (
          <AlertDestructive title={editBlogsSectionError} />
        )}
        <BlogsSectionForm />
        <div className="flex justify-end">
          <SubmitButton
            text="Actualizar Sección de Blog y Posts"
            submitLoading={submitLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
