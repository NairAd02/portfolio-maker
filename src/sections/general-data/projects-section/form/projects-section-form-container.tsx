"use client";
import SubmitButton from "@/components/form/components/submit-button";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProjectsSectionForm from "./projects-section-form";
import useEditProjectsSection from "../hooks/use-edit-projects-section";
import { toast } from "react-toastify";
import { revalidateServerPath } from "@/lib/cache";
import { paths } from "@/routes/path";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectsSectionSchema,
  ProjectsSectionSchema,
} from "./schemas/projects-section-schema";
import { ProjectsSectionReport } from "@/lib/types/portfolio";

interface Props {
  projectsSectionReport: ProjectsSectionReport;
}

export default function ProjectsSectionFormContainer({
  projectsSectionReport,
}: Props) {
  const {
    loading: submitLoading,
    editProjectsSection,
    error: editProjectsSectionError,
  } = useEditProjectsSection({
    onEditAction: () => {
      toast.success("Sección de proyectos editada con éxito");
      revalidateServerPath(paths.generalData.projectsSection);
    },
  });
  const form = useForm<ProjectsSectionSchema>({
    resolver: zodResolver(projectsSectionSchema),
    defaultValues: {
      feature_project_text: projectsSectionReport.feature_project_text || "",
    },
  });

  function onSubmit(projectsSection: ProjectsSectionSchema) {
    editProjectsSection(projectsSection);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {editProjectsSectionError && (
          <AlertDestructive title={editProjectsSectionError} />
        )}
        <ProjectsSectionForm />
        <Separator className="bg-border/50" />
        <div className="flex justify-end">
          <SubmitButton
            text="Actualizar Sección de Proyectos"
            submitLoading={submitLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
