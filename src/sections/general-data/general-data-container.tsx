import React, { ReactNode, Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Save } from "lucide-react";
import SectionsHeader from "@/components/sections-header/sections-header";
import SectionSkeleton from "./components/section-skeleton";

interface Props {
  personalInformation: ReactNode;
  projectsSection: ReactNode;
  experiencesSection: ReactNode;
  skillsSection: ReactNode;
  certificationsSection: ReactNode;
  blogsSection: ReactNode;
  aboutSection: ReactNode;
}

export default function GeneralDataContainer({
  personalInformation,
  projectsSection,
  experiencesSection,
  skillsSection,
  certificationsSection,
  blogsSection,
  aboutSection,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<User />}
        sectionTitle="Información Personal"
        sectionDescription="Gestione la información personal de su repositorio"
      />
      <div className="container mx-auto px-6 py-2">
        <div className="grid gap-8 max-w-4xl mx-auto">
          {/* Información Personal */}
          <Suspense
            fallback={
              <SectionSkeleton
                sectionTitle="Información Personal"
                sectionDescription="Configura tu nombre, foto y frase introductoria"
              />
            }
          >
            {personalInformation}
          </Suspense>
          {/* Información de Contacto */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Información de Contacto
                  </CardTitle>
                  <CardDescription>
                    Email y texto de la sección de contacto
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="contact_email"
                    className="text-sm font-medium"
                  >
                    Email de contacto
                  </Label>
                  <Input
                    id="contact_email"
                    type="email"
                    placeholder="tu@email.com"
                    className="bg-input border-border focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_text" className="text-sm font-medium">
                    Texto de contacto
                  </Label>
                  <Textarea
                    id="contact_text"
                    placeholder="Descripción para la sección de contacto"
                    className="bg-input border-border focus:ring-primary/20 min-h-[100px]"
                  />
                </div>
              </div>
              <Separator className="bg-border/50" />
              <div className="flex justify-end">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4" />
                  Guardar contacto
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sección Acerca de */}
          <Suspense
            fallback={
              <SectionSkeleton
                sectionTitle="Acerca de"
                sectionDescription="Tu presentación personal y profesional"
              />
            }
          >
            {aboutSection}
          </Suspense>

          {/* Proyectos Destacados */}
          <Suspense
            fallback={
              <SectionSkeleton
                sectionTitle="Proyectos Realizados"
                sectionDescription="Texto introductorio para la sección donde mostrarás tus proyectos"
                variant="complex"
              />
            }
          >
            {projectsSection}
          </Suspense>

          {/* Experiencia Laboral */}
          <Suspense
            fallback={
              <SectionSkeleton
                sectionTitle="Experiencia Laboral"
                sectionDescription="Información sobre tu trayectoria profesional"
                variant="complex"
              />
            }
          >
            {experiencesSection}
          </Suspense>

          {/* Tecnologías y Habilidades */}
          <Suspense
            fallback={
              <SectionSkeleton
                sectionTitle="Tecnologías y Habilidades"
                sectionDescription="Descripción de tus competencias técnicas"
                variant="complex"
              />
            }
          >
            {skillsSection}
          </Suspense>

          {/* Educación y Certificaciones */}
          <Suspense
            fallback={
              <SectionSkeleton
                sectionTitle="Educación y Certificaciones"
                sectionDescription="Tu formación académica y certificaciones"
                variant="complex"
              />
            }
          >
            {certificationsSection}
          </Suspense>

          {/* Blog y Posts */}
          <Suspense
            fallback={
              <SectionSkeleton
                sectionTitle="Blog y Posts"
                sectionDescription="Información sobre tu contenido y publicaciones"
                variant="complex"
              />
            }
          >
            {blogsSection}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
