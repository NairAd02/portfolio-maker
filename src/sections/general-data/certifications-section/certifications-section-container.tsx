import { SectionStats } from "@/components/section-stats/section-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FolderOpen, GraduationCap } from "lucide-react";
import React from "react";
import { getCertificationsSectionReport } from "@/lib/services/portfolio";
import { Separator } from "@/components/ui/separator";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { paths } from "@/routes/path";
import { Button } from "@/components/ui/button";

import CertificationsSectionFormContainer from "./form/certifications-section-form-container";

export default async function CertificationsSectionContainer() {
  const res = await getCertificationsSectionReport();

  if (!res.data || res.error)
    return <div>Error al cargar la sección de certificaciones</div>;

  const certificationsSectionReport = res.data;
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">
              {" "}
              Educación y Certificaciones
            </CardTitle>
            <CardDescription>
              Tu formación académica y certificaciones
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <CertificationsSectionFormContainer
          certificationsSectionReport={certificationsSectionReport}
        />
        <Separator className="bg-primary" />
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex gap-4 items-center justify-center w-full">
            <SectionStats
              icon={FolderOpen}
              title="Certificaciones Totales"
              count={certificationsSectionReport.certificationsCount}
              description="Certificaciones registradas"
              variant="default"
            />
            <SectionStats
              icon={FolderOpen}
              title="Grupos de Certificaciones Totales"
              count={certificationsSectionReport.certificationGroupsCount}
              description="Grupos de certificaciones registradas"
              variant="default"
            />
          </div>
          <div className="flex items-center justify-center gap-4">
            <NavigationComponent href={paths.certifications.root}>
              <Button className="text-base cursor-pointer" size={"lg"}>
                Ver Certificaciones
              </Button>
            </NavigationComponent>
            <NavigationComponent href={paths.certificationGroups.root}>
              <Button className="text-base cursor-pointer" size={"lg"}>
                Ver Grupo de Certificaciones
              </Button>
            </NavigationComponent>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
