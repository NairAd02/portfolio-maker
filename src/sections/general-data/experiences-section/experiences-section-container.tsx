import { SectionStats } from "@/components/section-stats/section-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, FolderOpen } from "lucide-react";
import React from "react";
import { getExperiencesSectionReport } from "@/lib/services/portfolio";
import { Separator } from "@/components/ui/separator";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { paths } from "@/routes/path";
import { Button } from "@/components/ui/button";
import ExperiencesSectionFormContainer from "./form/experiences-section-form-container";

export default async function ExperiencesSectionContainer() {
  const res = await getExperiencesSectionReport();

  if (!res.data || res.error)
    return <div>Error al cargar la sección de experiencias laborales</div>;

  const experiencesSectionReport = res.data;
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Experiencia Laboral</CardTitle>
            <CardDescription>
              Información sobre tu trayectoria profesional
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <ExperiencesSectionFormContainer
          experiencesSectionReport={experiencesSectionReport}
        />
        <Separator className="bg-primary" />
        <div className="flex flex-col gap-4 items-center justify-center">
          <SectionStats
            icon={FolderOpen}
            title="Experiencias Laborales Totales"
            count={experiencesSectionReport.experiencesCount}
            description="Experiencas Laborales Registradas"
            variant="default"
          />
          <NavigationComponent href={paths.experiences.root}>
            <Button className="text-base cursor-pointer" size={"lg"}>
              Ver Experiencias Laborales
            </Button>
          </NavigationComponent>
        </div>
      </CardContent>
    </Card>
  );
}
