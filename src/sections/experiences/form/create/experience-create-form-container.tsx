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
import useCreateExperience from "../../hooks/use-create-experience";
import {
  ExperienceCreate,
  experienceCreateSchema,
} from "./schemas/experience-create-schema";
import ExperienceForm from "../experience-form";

export default function ExperienceCreateFormContainer() {
  const router = useRouter();
  const {
    loading: submitLoading,
    createExperience,
    error: createExperienceError,
  } = useCreateExperience({
    onCreateAction: () => {
      toast.success("Experiencia creada con éxito");
      revalidateServerPath(paths.experiences.root);
      handleClose();
    },
  });
  const form = useForm<ExperienceCreate>({
    resolver: zodResolver(experienceCreateSchema),
    defaultValues: {
      company: "",
      position: "",
      description: "",
      achievements: [],
      technologies: [],
    },
  });

  const handleClose = () => {
    router.push(paths.experiences.root);
  };

  function onSubmit(experience: ExperienceCreate) {
    createExperience(experience);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {createExperienceError && (
          <AlertDestructive title={createExperienceError} />
        )}
        <ExperienceForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Crear Experiencia"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
