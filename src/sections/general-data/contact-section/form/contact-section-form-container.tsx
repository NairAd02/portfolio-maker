"use client";
import SubmitButton from "@/components/form/components/submit-button";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { revalidateServerPath } from "@/lib/cache";
import { paths } from "@/routes/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSectionReport } from "@/lib/types/portfolio";
import useEditContactSection from "../hooks/use-edit-contact-section";
import {
  contactSectionSchema,
  ContactSectionSchema,
} from "./schemas/contact-section-schema";
import ContactSectionForm from "./contact-section-form";
import useFileForm from "@/components/form/hooks/use-file-form";

interface Props {
  contactSectionReport: ContactSectionReport;
}

export default function ContactSectionFormContainer({
  contactSectionReport,
}: Props) {
  const {
    loading: submitLoading,
    editContactSection,
    error: editContactSectionError,
  } = useEditContactSection({
    onEditAction: () => {
      toast.success("Sección de proyectos editada con éxito");
      revalidateServerPath(paths.generalData.contactSection);
    },
  });
  const form = useForm<ContactSectionSchema>({
    resolver: zodResolver(contactSectionSchema),
    defaultValues: {
      contact_email: contactSectionReport.contact_email || "",
      contact_text: contactSectionReport.contact_text || "",
      contact_phone: contactSectionReport.contact_phone || "",
      location: contactSectionReport.location || "",
    },
  });

  const { loading: loadingFile, error: errorFile } = useFileForm({
    form,
    fileUrl: contactSectionReport.cv_doc,
    fileName: contactSectionReport.portfolioId || "cv",
    fieldName: "cv_doc",
  });

  function onSubmit(contactSection: ContactSectionSchema) {
    editContactSection(contactSection);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-8 h-full"
      >
        {editContactSectionError && (
          <AlertDestructive title={editContactSectionError} />
        )}
        <ContactSectionForm
          fileReceived={{ loading: loadingFile, error: errorFile }}
          cv_doc={contactSectionReport.cv_doc}
        />
        <div className="flex justify-end">
          <SubmitButton
            text="Actualizar Sección de Contacto"
            submitLoading={submitLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
}
