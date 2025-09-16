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
import useCreateCertification from "../../hooks/use-create-certification";
import {
  CertificationCreate,
  certificationCreateSchema,
} from "./schemas/certification-create-schema";
import CertificationForm from "../certification-form";

export default function CertificationCreateFormContainer() {
  const router = useRouter();
  const {
    loading: submitLoading,
    createCertification,
    error: createCertificationError,
  } = useCreateCertification({
    onCreateAction: () => {
      toast.success("Certificación creada con éxito");
      revalidateServerPath(paths.certifications.root);
      handleClose();
      router.refresh();
    },
  });
  const form = useForm<CertificationCreate>({
    resolver: zodResolver(certificationCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      institution: "",
      link: "",
    },
  });

  const handleClose = () => {
    router.back();
  };

  function onSubmit(certification: CertificationCreate) {
    createCertification(certification);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {createCertificationError && (
          <AlertDestructive title={createCertificationError} />
        )}
        <CertificationForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Crear Certificación"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
