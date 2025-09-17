"use client";
import RHFSelectableCardListField from "@/components/form/rhf-components/rhf-selectable-card-list-field/rhf-selectable-card-list-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { modalTypes } from "@/components/modal/types/modalTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CertificationCard from "@/sections/certifications/components/certification-card/certification-card";
import { CertificationSchema } from "@/sections/certifications/form/schemas/certification-schema";
import { FileTextIcon } from "lucide-react";
import React from "react";

export default function CertificationGroupForm() {
  return (
    <div className="flex-1 overflow-auto flex flex-col max-h-[75vh] p-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon className="w-5 h-5" />
            Información General
          </CardTitle>
          <CardDescription>
            Información general de la certificación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <RHFTextField
            name="title"
            label="Título *"
            placeholder="Ingrese el título del grupo de certificaciones..."
            fullWidth
          />
          <RHFSelectableCardListField<CertificationSchema>
            name="certifications"
            label="Certificaciones"
            selectElementsText="Añadir certificación"
            CardComponent={CertificationCard}
            modalPath={modalTypes.selectableCertificationsModal.name}
          />
        </CardContent>
      </Card>
    </div>
  );
}
