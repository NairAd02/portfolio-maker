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
import {
  User,
  Mail,
  FileText,
  Briefcase,
  Code,
  GraduationCap,
  BookOpen,
  Save,
} from "lucide-react";
import SectionsHeader from "@/components/sections-header/sections-header";

interface Props {
  personalInformation: ReactNode;
}

export default function GeneralDataContainer({ personalInformation }: Props) {
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
            fallback={<div>Fallback de carga de información personal...</div>}
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
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="about_text" className="text-sm font-medium">
                  Texto de presentación
                </Label>
                <Textarea
                  id="about_text"
                  placeholder="Cuéntanos sobre ti, tu experiencia y tus objetivos profesionales..."
                  className="bg-input border-border focus:ring-primary/20 min-h-[120px]"
                />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex justify-end">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4" />
                  Guardar presentación
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Proyectos Destacados */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Proyectos Destacados
                  </CardTitle>
                  <CardDescription>
                    Texto introductorio para tus proyectos principales
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="feature_projecttext"
                  className="text-sm font-medium"
                >
                  Texto de proyectos destacados
                </Label>
                <Textarea
                  id="feature_projecttext"
                  placeholder="Descripción que aparecerá en la sección de proyectos destacados..."
                  className="bg-input border-border focus:ring-primary/20 min-h-[100px]"
                />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex justify-end">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4" />
                  Guardar proyectos
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Experiencia Laboral */}
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
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="work_experiencetext"
                  className="text-sm font-medium"
                >
                  Texto de experiencia laboral
                </Label>
                <Textarea
                  id="work_experiencetext"
                  placeholder="Descripción que aparecerá en la sección de experiencia laboral..."
                  className="bg-input border-border focus:ring-primary/20 min-h-[100px]"
                />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex justify-end">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4" />
                  Guardar experiencia
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tecnologías y Habilidades */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Tecnologías y Habilidades
                  </CardTitle>
                  <CardDescription>
                    Descripción de tus competencias técnicas
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="technologies_and_skills_text"
                  className="text-sm font-medium"
                >
                  Texto de tecnologías y habilidades
                </Label>
                <Textarea
                  id="technologies_and_skills_text"
                  placeholder="Descripción que aparecerá en la sección de tecnologías y habilidades..."
                  className="bg-input border-border focus:ring-primary/20 min-h-[100px]"
                />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex justify-end">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4" />
                  Guardar habilidades
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Educación y Certificaciones */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Educación y Certificaciones
                  </CardTitle>
                  <CardDescription>
                    Tu formación académica y certificaciones
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="education_and_certifications_text"
                  className="text-sm font-medium"
                >
                  Texto de educación y certificaciones
                </Label>
                <Textarea
                  id="education_and_certifications_text"
                  placeholder="Descripción que aparecerá en la sección de educación y certificaciones..."
                  className="bg-input border-border focus:ring-primary/20 min-h-[100px]"
                />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex justify-end">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4" />
                  Guardar educación
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Blog y Posts */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Blog y Posts</CardTitle>
                  <CardDescription>
                    Información sobre tu contenido y publicaciones
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="blog_and_post_text"
                  className="text-sm font-medium"
                >
                  Texto de blog y posts
                </Label>
                <Textarea
                  id="blog_and_post_text"
                  placeholder="Descripción que aparecerá en la sección de blog y posts..."
                  className="bg-input border-border focus:ring-primary/20 min-h-[100px]"
                />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex justify-end">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4" />
                  Guardar blog
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
