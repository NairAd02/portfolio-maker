"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { paths } from "@/routes/path";
import { revalidateServerPath } from "@/lib/cache";
import { useRouter } from "next/navigation";
import useEditCertificationGroup from "../../hooks/use-edit-certification-group";
import { CertificationGroupDetails } from "@/lib/types/certification-groups";
import {
  CertificationGroupEdit,
  certificationGroupEditSchema,
} from "./schemas/certification-group-edit-schema";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import FormActionButtons from "@/components/form/components/form-action-buttons";
import CertificationGroupForm from "../certification-group-form";

interface Props {
  certificationGroup: CertificationGroupDetails;
}

export default function CertificationGroupEditFormContainer({
  certificationGroup,
}: Props) {
  const router = useRouter();
  const {
    loading: submitLoading,
    editCertificationGroup,
    error: editCertificationGroupError,
  } = useEditCertificationGroup({
    id: certificationGroup.id,
    onEditAction: () => {
      toast.success("Grupo de certificaciones editado con éxito");
      revalidateServerPath(paths.certificationGroups.root);
      handleClose();
      router.refresh();
    },
  });
  const form = useForm<CertificationGroupEdit>({
    resolver: zodResolver(certificationGroupEditSchema),
    defaultValues: {
      title: certificationGroup.id,
      certifications: certificationGroup.certifications,
    },
  });

  const handleClose = () => {
    router.back();
  };

  function onSubmit(certificationGroup: CertificationGroupEdit) {
    editCertificationGroup(certificationGroup);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {editCertificationGroupError && (
          <AlertDestructive title={editCertificationGroupError} />
        )}
        <CertificationGroupForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Editar Grupo de Certificaciones"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
