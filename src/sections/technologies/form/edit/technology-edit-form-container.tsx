"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import FormActionButtons from "@/components/form/components/form-action-buttons";
import { useRouter } from "next/navigation";
import TechnologyForm from "../technology-form";
import { TechnologyDetails } from "@/lib/types/technologies";
import useEditTechnology from "../../hooks/use-edit-technology";
import {
  TechnologyEdit,
  technologyEditSchema,
} from "./schemas/technology-edit-schema";
import useImageForm from "@/components/form/hooks/use-image-form";

interface Props {
  technology: TechnologyDetails;
}

export default function TechnologyEditFormContainer({ technology }: Props) {
  const router = useRouter();
  const { loading: submitLoading, editTechnology } = useEditTechnology({
    id: technology.id,
    onEditAction: () => {
      toast.success("Tecnología editada con éxito");
      revalidateServerPath(paths.technologies.root);
      handleClose();
      router.refresh();
    },
  });
  const form = useForm<TechnologyEdit>({
    resolver: zodResolver(technologyEditSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    router.back();
  };

  function onSubmit(technology: TechnologyEdit) {
    editTechnology(technology);
  }

  const { loading: loadingImage, error: errorImage } = useImageForm({
    form,
    imageUrl: technology.icon,
    imageName: technology.name,
    fieldName: "icon",
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <TechnologyForm
          imageRecived={{ loading: loadingImage, error: errorImage }}
        />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Crear Tecnología"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
