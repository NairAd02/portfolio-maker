"use client";
import { Separator } from "@/components/ui/separator";
import React from "react";
import PersonalInformationForm from "./personal-information-form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useEditPersonalInformation from "../hooks/use-edit-personal-information";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { toast } from "react-toastify";
import { revalidateServerPath } from "@/lib/cache";
import { paths } from "@/routes/path";
import {
  personalInformationSchema,
  PersonalInformationSchema,
} from "./schemas/personal-information-schema";
import { PersonalInformationReport } from "@/lib/types/portfolio";
import useImageForm from "@/components/form/hooks/use-image-form";
import SubmitButton from "@/components/form/components/submit-button";

interface Props {
  personalInformationReport: PersonalInformationReport;
}

export default function PersonalInformationFormContainer({
  personalInformationReport,
}: Props) {
  const {
    loading: submitLoading,
    editPersonalInformation,
    error: editPersonalInformationError,
  } = useEditPersonalInformation({
    onEditAction: () => {
      toast.success("Información Personal editada con éxito");
      revalidateServerPath(paths.generalData.personalInformation);
    },
  });
  const form = useForm<PersonalInformationSchema>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      contact_name: personalInformationReport.contact_name || "",
      introductory_phrase: personalInformationReport.introductory_phrase || "",
    },
  });

  const { loading: loadingImage, error: errorImage } = useImageForm({
    form,
    imageUrl: personalInformationReport.contact_image,
    imageName: personalInformationReport.portfolioId,
    fieldName: "contact_image",
  });

  function onSubmit(personalInformation: PersonalInformationSchema) {
    editPersonalInformation(personalInformation);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {editPersonalInformationError && (
          <AlertDestructive title={editPersonalInformationError} />
        )}
        <PersonalInformationForm
          imageRecived={{ loading: loadingImage, error: errorImage }}
        />
        <Separator className="bg-primary" />
        <div className="flex justify-end">
          <SubmitButton
            text="Actualizar información personal"
            submitLoading={submitLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
