"use client";
import SubmitButton from "@/components/form/components/submit-button";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { revalidateServerPath } from "@/lib/cache";
import { paths } from "@/routes/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExperiencesSectionReport } from "@/lib/types/portfolio";
import useEditExperiencesSection from "../hooks/use-edit-experiences-section";
import {
  experiencesSectionSchema,
  ExperiencesSectionSchema,
} from "./schemas/experiences-section-schema";
import ExperiencesSectionForm from "./experiences-section-form";

interface Props {
  experiencesSectionReport: ExperiencesSectionReport;
}

export default function ExperiencesSectionFormContainer({
  experiencesSectionReport,
}: Props) {
  const {
    loading: submitLoading,
    editExperiencesSection,
    error: editExperiencesSectionError,
  } = useEditExperiencesSection({
    onEditAction: () => {
      toast.success("Sección de experiencias laborales actualizada con éxito");
      revalidateServerPath(paths.generalData.experiencesSection);
    },
  });
  const form = useForm<ExperiencesSectionSchema>({
    resolver: zodResolver(experiencesSectionSchema),
    defaultValues: {
      work_experience_text: experiencesSectionReport.work_experience_text || "",
    },
  });

  function onSubmit(experiencesSection: ExperiencesSectionSchema) {
    editExperiencesSection(experiencesSection);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-8 h-full"
      >
        {editExperiencesSectionError && (
          <AlertDestructive title={editExperiencesSectionError} />
        )}
        <ExperiencesSectionForm />
        <div className="flex justify-end">
          <SubmitButton
            text="Actualizar Sección de Experiencias Laborales"
            submitLoading={submitLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
