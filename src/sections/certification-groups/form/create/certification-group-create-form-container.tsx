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
import useCreateCertificationGroup from "../../hooks/use-create-certification-group";
import {
  CertificationGroupCreate,
  certificationGroupCreateSchema,
} from "./schemas/certification-group-create-schema";
import CertificationGroupForm from "../certification-group-form";

export default function CertificationGroupCreateFormContainer() {
  const router = useRouter();
  const {
    loading: submitLoading,
    createCertificationGroup,
    error: createCertificationGroupError,
  } = useCreateCertificationGroup({
    onCreateAction: () => {
      toast.success("Grupo de certificaciones creado con éxito");
      revalidateServerPath(paths.certificationGroups.root);
      handleClose();
    },
  });
  const form = useForm<CertificationGroupCreate>({
    resolver: zodResolver(certificationGroupCreateSchema),
    defaultValues: {
      title: "",
      certifications: [],
    },
  });

  const handleClose = () => {
    router.push(paths.certificationGroups.root);
  };

  function onSubmit(certificationGroup: CertificationGroupCreate) {
    createCertificationGroup(certificationGroup);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {createCertificationGroupError && (
          <AlertDestructive title={createCertificationGroupError} />
        )}
        <CertificationGroupForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Crear Grupo de Certificaciones"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
