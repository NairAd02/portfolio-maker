import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import React from "react";
import { getAboutSectionReport } from "@/lib/services/portfolio";

import AboutSectionFormContainer from "./form/about-section-form-container";

export default async function AboutSectionContainer() {
  const res = await getAboutSectionReport();

  if (!res.data || res.error)
    return <div>Error al cargar la sección de acerca de</div>;

  const aboutSectionReport = res.data;
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Acerca de</CardTitle>
            <CardDescription>
              Tu presentación personal y profesional
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <AboutSectionFormContainer aboutSectionReport={aboutSectionReport} />
      </CardContent>
    </Card>
  );
}
