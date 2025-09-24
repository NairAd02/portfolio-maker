"use client";
import SubmitButton from "@/components/form/components/submit-button";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { revalidateServerPath } from "@/lib/cache";
import { paths } from "@/routes/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkillsSectionReport } from "@/lib/types/portfolio";
import useEditSkillsSection from "../hooks/use-edit-skills-section";
import {
  skillsSectionSchema,
  SkillsSectionSchema,
} from "./schemas/skills-section-schema";
import SkillsSectionForm from "./skills-section-form";

interface Props {
  skillsSectionReport: SkillsSectionReport;
}

export default function SkillsSectionFormContainer({
  skillsSectionReport,
}: Props) {
  const {
    loading: submitLoading,
    editSkillsSection,
    error: editSkillsSectionReport,
  } = useEditSkillsSection({
    onEditAction: () => {
      toast.success("Sección de habilidades editada con éxito");
      revalidateServerPath(paths.generalData.skillsSection);
    },
  });
  const form = useForm<SkillsSectionSchema>({
    resolver: zodResolver(skillsSectionSchema),
    defaultValues: {
      technologies_and_skills_text:
        skillsSectionReport.technologies_and_skills_text || "",
    },
  });

  function onSubmit(skillsSection: SkillsSectionSchema) {
    editSkillsSection(skillsSection);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-8 h-full"
      >
        {editSkillsSectionReport && (
          <AlertDestructive title={editSkillsSectionReport} />
        )}
        <SkillsSectionForm />
        <div className="flex justify-end">
          <SubmitButton
            text="Actualizar Sección de Habilidades"
            submitLoading={submitLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
