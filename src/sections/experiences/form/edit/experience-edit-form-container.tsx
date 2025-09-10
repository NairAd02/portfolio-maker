"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import FormActionButtons from "@/components/form/components/form-action-buttons";
import { useRouter } from "next/navigation";
import useImageForm from "@/components/form/hooks/use-image-form";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { ExperienceDetails } from "@/lib/types/experiences";
import useEditExperience from "../../hooks/use-edit-experience";
import {
  ExperienceEdit,
  experienceEditSchema,
} from "./schemas/experience-edit-schema";
import ExperienceForm from "../experience-form";

interface Props {
  experience: ExperienceDetails;
}

export default function ExperienceEditFormContainer({ experience }: Props) {
  const router = useRouter();
  const {
    loading: submitLoading,
    editExperience,
    error: editExperienceError,
  } = useEditExperience({
    id: experience.id,
    onEditAction: () => {
      toast.success("Experiencia editada con éxito");
      revalidateServerPath(paths.experiences.root);
      handleClose();
      router.refresh();
    },
  });
  const form = useForm<ExperienceEdit>({
    resolver: zodResolver(experienceEditSchema),
    defaultValues: {
      company: experience.company,
      position: experience.position,
      description: experience.description,
      startdate: new Date(experience.startdate),
      enddate: new Date(experience.enddate),
      achievements: experience.achievements.map((achievement) => ({
        name: achievement,
      })),
      technologies: experience.technologies.map((technology) =>
        String(technology.id)
      ),
    },
  });

  const handleClose = () => {
    router.back();
  };

  function onSubmit(experience: ExperienceEdit) {
    editExperience(experience);
  }

  const { loading: loadingImage, error: errorImage } = useImageForm({
    form,
    imageUrl: experience.mainImage,
    imageName: experience.company,
    fieldName: "mainImage",
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {editExperienceError && (
          <AlertDestructive title={editExperienceError} />
        )}
        <ExperienceForm
          imageRecived={{ loading: loadingImage, error: errorImage }}
        />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Editar Experiencia"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
