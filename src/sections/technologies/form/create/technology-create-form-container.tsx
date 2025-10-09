"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import FormActionButtons from "@/components/form/components/form-action-buttons";
import { useRouter } from "next/navigation";
import useCreateTechnology from "../../hooks/use-create-technology";
import {
  TechnologyCreate,
  technologyCreateSchema,
} from "./schemas/technology-create-schema";
import TechnologyForm from "../technology-form";
import { AlertDestructive } from "@/components/ui/alert-destructive";

export default function TechnologyCreateFormContainer() {
  const router = useRouter();
  const {
    loading: submitLoading,
    createTechnology,
    error: createTechnologyError,
  } = useCreateTechnology({
    onCreateAction: () => {
      toast.success("Tecnología creada con éxito");
      revalidateServerPath(paths.technologies.root);
      handleClose();
    },
  });
  const form = useForm<TechnologyCreate>({
    resolver: zodResolver(technologyCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    router.push(paths.technologies.root);
  };

  function onSubmit(technology: TechnologyCreate) {
    createTechnology(technology);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {createTechnologyError && (
          <AlertDestructive title={createTechnologyError} />
        )}
        <TechnologyForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Crear Tecnología"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
