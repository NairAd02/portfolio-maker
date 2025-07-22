"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
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

export default function NewProjectFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, createProject } = useCreateProject({
    onCreateAction: () => {
      toast.success("Proyecto creado con éxito");
      handleClose();
      revalidateServerPath(paths.projects.root);
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
    handleCloseModal(modalTypes.newProyectModal.name);
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
