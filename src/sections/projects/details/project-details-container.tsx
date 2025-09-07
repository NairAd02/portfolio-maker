import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { principalPlaceHolder } from "@/lib/place-holders";
import { ProjectDetails } from "@/lib/types/projects";
import {
  ExternalLink,
  Github,
  Lightbulb,
  Target,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import Image from "next/image";

interface Props {
  project: ProjectDetails;
}

export function ProjectDetailsContainer({ project }: Props) {
  return (
    <div className="max-w-6xl mx-auto rounded-2xl bg-white shadow-lg p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">{project.name}</h1>
            <p className="text-muted-foreground text-lg text-pretty">
              {project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 shrink-0">
            {project.sourceCodeUrl && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.sourceCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Código
                </a>
              </Button>
            )}
            {project.deploymentUrl && (
              <Button size="sm" asChild>
                <a
                  href={project.deploymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech.id} variant="default" className="px-3 py-1">
              {tech.icon && <span className="mr-1">{tech.icon}</span>}
              {tech.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Image */}
      {project.mainImage && (
        <div className="relative  h-[400px] rounded-lg overflow-hidden bg-muted">
          <Image
            src={project.mainImage || principalPlaceHolder}
            alt={`Imagen principal de ${project.name}`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Project Story Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Problem */}
        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-lg">Problema</h3>
            </div>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              {project.problem}
            </p>
          </CardContent>
        </Card>

        {/* Solution */}
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Solución</h3>
            </div>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              {project.solution}
            </p>
          </CardContent>
        </Card>

        {/* Impact */}
        <Card className="border-l-4 border-l-chart-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-chart-1" />
              <h3 className="font-semibold text-lg">Impacto</h3>
            </div>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              {project.impact}
            </p>
          </CardContent>
        </Card>

        {/* Teachings */}
        <Card className="border-l-4 border-l-chart-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-chart-2" />
              <h3 className="font-semibold text-lg">Aprendizajes</h3>
            </div>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              {project.teachings}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Image Gallery */}
      {project.images.length > 0 && (
        <div className="space-y-4">
          <Separator />
          <div>
            <h3 className="font-semibold text-lg mb-4">Galería del Proyecto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden bg-muted group cursor-pointer"
                >
                  <Image
                    src={image || principalPlaceHolder}
                    alt={`Imagen ${index + 1} de ${project.name}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
