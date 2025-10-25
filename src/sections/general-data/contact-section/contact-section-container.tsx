import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import React from "react";
import { getContactSectionReport } from "@/lib/services/portfolio";
import ContactSectionFormContainer from "./form/contact-section-form-container";


export default async function ContactSectionContainer() {
  const res = await getContactSectionReport();

  if (!res.data || res.error)
    return <div>No fue posible cargar el reporte</div>;

  const contactSectionReport = res.data;

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Información de Contacto</CardTitle>
            <CardDescription>
              Email y texto de la sección de contacto
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-6 h-full">
        <ContactSectionFormContainer
          contactSectionReport={contactSectionReport}
        />
      </CardContent>
    </Card>
  );
}
