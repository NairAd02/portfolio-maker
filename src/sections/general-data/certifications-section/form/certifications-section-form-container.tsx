"use client";
import SubmitButton from "@/components/form/components/submit-button";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { revalidateServerPath } from "@/lib/cache";
import { paths } from "@/routes/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { CertificationsSectionReport } from "@/lib/types/portfolio";
import useEditCertificationsSection from "../hooks/use-edit-certifications-section";
import {
  certificationsSectionSchema,
  CertificationsSectionSchema,
} from "./schemas/certifications-section-schema";
import CertificationsSectionForm from "./certifications-section-form";

interface Props {
  certificationsSectionReport: CertificationsSectionReport;
}

export default function CertificationsSectionFormContainer({
  certificationsSectionReport,
}: Props) {
  const {
    loading: submitLoading,
    editCertificationsSection,
    error: editCertificationsSectionError,
  } = useEditCertificationsSection({
    onEditAction: () => {
      toast.success("Sección de certificaciones editada con éxito");
      revalidateServerPath(paths.generalData.certificationsSection);
    },
  });
  const form = useForm<CertificationsSectionSchema>({
    resolver: zodResolver(certificationsSectionSchema),
    defaultValues: {
      education_and_certifications_text:
        certificationsSectionReport.education_and_certifications_text || "",
    },
  });

  function onSubmit(certificationsSection: CertificationsSectionSchema) {
    editCertificationsSection(certificationsSection);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-8 h-full"
      >
        {editCertificationsSectionError && (
          <AlertDestructive title={editCertificationsSectionError} />
        )}
        <CertificationsSectionForm />
        <div className="flex justify-end">
          <SubmitButton
            text="Actualizar Sección de Certificaciones"
            submitLoading={submitLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
