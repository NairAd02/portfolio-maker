import { SectionStats } from "@/components/section-stats/section-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, FolderOpen } from "lucide-react";
import React from "react";
import { getSkillsSectionReport } from "@/lib/services/portfolio";
import { Separator } from "@/components/ui/separator";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { paths } from "@/routes/path";
import { Button } from "@/components/ui/button";
import SkillsSectionFormContainer from "./form/skills-section-form-container";

export default async function SkillsSectionContainer() {
  const res = await getSkillsSectionReport();

  if (!res.data || res.error)
    return <div>Error al cargar la sección de habilidades</div>;

  const skillsSectionReport = res.data;
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Tecnologías y Habilidades</CardTitle>
            <CardDescription>
              Descripción de tus competencias técnicas
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <SkillsSectionFormContainer skillsSectionReport={skillsSectionReport} />
        <Separator className="bg-primary" />
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex gap-4 items-center justify-center w-full">
            <SectionStats
              icon={FolderOpen}
              title="Habilidades Totales"
              count={skillsSectionReport.skillsCount}
              description="Habilidades registradas"
              variant="default"
            />
            <SectionStats
              icon={FolderOpen}
              title="Grupos de Habilidades Totales"
              count={skillsSectionReport.skillGroupsCount}
              description="Grupos de habilidades registradas"
              variant="default"
            />
          </div>
          <NavigationComponent href={paths.skillGroups.root}>
            <Button className="text-base cursor-pointer" size={"lg"}>
              Ver Grupos de Habilidades
            </Button>
          </NavigationComponent>
        </div>
      </CardContent>
    </Card>
  );
}
