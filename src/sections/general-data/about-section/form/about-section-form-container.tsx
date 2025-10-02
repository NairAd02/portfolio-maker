"use client";
import SubmitButton from "@/components/form/components/submit-button";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { revalidateServerPath } from "@/lib/cache";
import { paths } from "@/routes/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { AboutSectionReport } from "@/lib/types/portfolio";
import useEditAboutSection from "../hooks/use-edit-about-section";
import {
  aboutSectionSchema,
  AboutSectionSchema,
} from "./schemas/about-section-schema";
import AboutSectionForm from "./about-section-form";

interface Props {
  aboutSectionReport: AboutSectionReport;
}

export default function AboutSectionFormContainer({
  aboutSectionReport,
}: Props) {
  const {
    loading: submitLoading,
    editAboutSection,
    error: editAboutSectionError,
  } = useEditAboutSection({
    onEditAction: () => {
      toast.success("Sección de acerca de editada con éxito");
      revalidateServerPath(paths.generalData.certificationsSection);
    },
  });
  const form = useForm<AboutSectionSchema>({
    resolver: zodResolver(aboutSectionSchema),
    defaultValues: {
      about_text: aboutSectionReport.about_text || "",
    },
  });

  function onSubmit(aboutSection: AboutSectionSchema) {
    editAboutSection(aboutSection);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-8 h-full"
      >
        {editAboutSectionError && (
          <AlertDestructive title={editAboutSectionError} />
        )}
        <AboutSectionForm />
        <div className="flex justify-end">
          <SubmitButton
            text="Actualizar Sección de Acerca de"
            submitLoading={submitLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
