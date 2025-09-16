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
import CertificationForm from "../certification-form";
import { CertificationDetails } from "@/lib/types/certifications";
import useEditCertification from "../../hooks/use-edit-certification";
import {
  CertificationEdit,
  certificationEditSchema,
} from "./schemas/certification-edit-schema";
import useImageForm from "@/components/form/hooks/use-image-form";

interface Props {
  certification: CertificationDetails;
}

export default function CertificationEditFormContainer({
  certification,
}: Props) {
  const router = useRouter();
  const {
    loading: submitLoading,
    editCertification,
    error: editCertificationError,
  } = useEditCertification({
    id: certification.id,
    onEditAction: () => {
      toast.success("Certificación editada con éxito");
      revalidateServerPath(paths.certifications.root);
      handleClose();
      router.refresh();
    },
  });
  const form = useForm<CertificationEdit>({
    resolver: zodResolver(certificationEditSchema),
    defaultValues: {
      title: certification.title,
      institution: certification.institution,
      link: certification.link || "",
      startdate: new Date(certification.startdate),
      enddate: new Date(certification.enddate),
    },
  });

  const handleClose = () => {
    router.back();
  };

  function onSubmit(certification: CertificationEdit) {
    editCertification(certification);
  }

  const { loading: loadingImage, error: errorImage } = useImageForm({
    form,
    imageUrl: certification.image,
    imageName: certification.title,
    fieldName: "image",
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {editCertificationError && (
          <AlertDestructive title={editCertificationError} />
        )}
        <CertificationForm
          imageRecived={{ loading: loadingImage, error: errorImage }}
        />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Editar Certificación"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
