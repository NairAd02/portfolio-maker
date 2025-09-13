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
import SkillGroupForm from "../skill-group-form";
import useEditSkillGroup from "../../hooks/use-edit-skill-group";
import { SkillGroupDetails } from "@/lib/types/skill-groups";
import {
  SkillGroupEdit,
  skillGroupEditSchema,
} from "./schemas/skill-group-edit-schema";
import useImageForm from "@/components/form/hooks/use-image-form";

interface Props {
  skillGroup: SkillGroupDetails;
}

export default function SkillGroupEditFormContainer({ skillGroup }: Props) {
  const router = useRouter();
  const {
    loading: submitLoading,
    editSkillGroup,
    error: editSkillGroupError,
  } = useEditSkillGroup({
    id: skillGroup.id,
    onEditAction: () => {
      toast.success("Grupo de habilidad editado con éxito");
      revalidateServerPath(paths.skillGroups.root);
      handleClose();
      router.refresh();
    },
  });
  const form = useForm<SkillGroupEdit>({
    resolver: zodResolver(skillGroupEditSchema),
    defaultValues: {
      name: skillGroup.name,
      skills: skillGroup.skills.map((skill) => ({
        name: skill.name,
        level: skill.level,
        iconPath: skill.icon,
      })),
    },
  });

  const { loading: loadingIcon, error: errorIcon } = useImageForm({
    form,
    imageUrl: skillGroup.icon,
    imageName: skillGroup.name,
    fieldName: "icon",
  });

  const handleClose = () => {
    router.back();
  };

  function onSubmit(skillGroup: SkillGroupEdit) {
    editSkillGroup(skillGroup);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {editSkillGroupError && (
          <AlertDestructive title={editSkillGroupError} />
        )}
        <SkillGroupForm
          imageRecived={{ loading: loadingIcon, error: errorIcon }}
          mode="edit"
        />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Editar Grupo de Habilidades"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
