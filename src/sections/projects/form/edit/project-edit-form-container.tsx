"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import FormActionButtons from "@/components/form/components/form-action-buttons";
import ProjectForm from "../project-form";
import { ProjectEdit, projectEditSchema } from "./schemas/project-edit-schema";
import { ProjectDetails } from "@/lib/types/projects";
import useEditProject from "../../hooks/use-edit-project";
import useImagesForm from "@/components/form/hooks/use-images-form";
import useImageForm from "@/components/form/hooks/use-image-form";

interface Props {
  project: ProjectDetails;
}

export default function ProjectEditFormContainer({ project }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, editProject } = useEditProject({
    id: project.id,
    onEditAction: () => {
      toast.success("Proyecto editado con éxito");
      handleClose();
      revalidateServerPath(paths.projects.root);
    },
  });
  const form = useForm<ProjectEdit>({
    resolver: zodResolver(projectEditSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      deploymentUrl: project.deploymentUrl,
      impact: project.impact,
      problem: project.problem,
      solution: project.solution,
      sourceCodeUrl: project.sourceCodeUrl,
      teachings: project.teachings,
      technologies: project.technologies.map((technology) => technology.id),
      images: [],
    },
  });

  const { loading: loadingImage, error: errorImage } = useImageForm({
    form,
    imageUrl: project.mainImage,
    imageName: project.name,
    fieldName: "mainImage",
  });

  const { loading: loadingImages, error: errorImages } = useImagesForm({
    form,
    images: project.images,
    imageName: project.name,
    fieldName: "images",
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editProyectModal.name);
  };

  function onSubmit(project: ProjectEdit) {
    editProject(project);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <ProjectForm
          imageRecived={{ loading: loadingImage, error: errorImage }}
          imagesRecived={{ loading: loadingImages, error: errorImages }}
        />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Editar Proyecto"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
