"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useCreateProject from "../../hooks/use-create-project";
import { paths } from "@/routes/path";
import {
  ProjectCreate,
  projectCreateSchema,
} from "./schemas/project-create-schema";
import { revalidateServerPath } from "@/lib/cache";
import FormActionButtons from "@/components/form/components/form-action-buttons";
import ProjectForm from "../project-form";
import { useRouter } from "next/navigation";
import { AlertDestructive } from "@/components/ui/alert-destructive";

export default function ProjectCreateFormContainer() {
  const router = useRouter();
  const {
    loading: submitLoading,
    createProject,
    error: createProjectError,
  } = useCreateProject({
    onCreateAction: () => {
      toast.success("Proyecto creado con éxito");
      revalidateServerPath(paths.projects.root);
      handleClose();
      router.refresh();
    },
  });
  const form = useForm<ProjectCreate>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      deploymentUrl: "",
      impact: "",
      problem: "",
      solution: "",
      sourceCodeUrl: "",
      teachings: "",
      technologies: [],
      images: [],
    },
  });

  const handleClose = () => {
    router.back();
  };

  function onSubmit(project: ProjectCreate) {
    createProject(project);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {createProjectError && <AlertDestructive title={createProjectError} />}
        <ProjectForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Crear Proyecto"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
