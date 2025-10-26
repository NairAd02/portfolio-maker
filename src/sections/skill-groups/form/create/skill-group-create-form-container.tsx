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
import useCreateSkillGroup from "../../hooks/use-create-skill-group";
import {
  SkillGroupCreate,
  skillGroupCreateSchema,
} from "./schemas/skill-group-create-schema";
import SkillGroupForm from "../skill-group-form";

export default function SkillGroupCreateFormContainer() {
  const router = useRouter();
  const {
    loading: submitLoading,
    createSkillGroup,
    error: createSkillGroupError,
  } = useCreateSkillGroup({
    onCreateAction: () => {
      toast.success("Grupo de habilidad creado con éxito");
      revalidateServerPath(paths.skillGroups.root);
      handleClose();
    },
  });
  const form = useForm<SkillGroupCreate>({
    resolver: zodResolver(skillGroupCreateSchema),
    defaultValues: {
      name: "",
      skills: [],
      masteredTechnologies: [],
    },
  });

  const handleClose = () => {
    router.push(paths.skillGroups.root);
  };

  function onSubmit(skillGroup: SkillGroupCreate) {
    createSkillGroup(skillGroup);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {createSkillGroupError && (
          <AlertDestructive title={createSkillGroupError} />
        )}
        <SkillGroupForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Crear Grupo de Habilidades"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
