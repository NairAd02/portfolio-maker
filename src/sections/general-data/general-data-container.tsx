import React, { ReactNode, Suspense } from "react";
import { User } from "lucide-react";
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
  contactSection: ReactNode;
}

export default function GeneralDataContainer({
  personalInformation,
  projectsSection,
  experiencesSection,
  skillsSection,
  certificationsSection,
  blogsSection,
  aboutSection,
  contactSection,
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
          <Suspense
            fallback={
              <SectionSkeleton
                sectionTitle="Información de Contacto"
                sectionDescription="Email y texto de la sección de contacto"
              />
            }
          >
            {contactSection}
          </Suspense>

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
