import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { principalPlaceHolder } from "@/lib/place-holders";
import { ProjectDetails } from "@/lib/types/projects";
import {
  BookOpen,
  ExternalLink,
  Github,
  Info,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import InfoDetailsCard from "./components/info-details-card/info-details-card";
import AvatarContainer from "@/components/ui/avatar-container";

interface Props {
  project: ProjectDetails;
}

export function ProjectDetailsContainer({ project }: Props) {
  return (
    <div className="rounded-2xl bg-primary shadow-lg p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            <p className="text-white text-lg text-pretty">
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
            <Badge key={tech.id} variant="secondary" className="px-3 py-1">
              {tech.icon && (
                <AvatarContainer
                  className="h-6 w-6"
                  image={tech.icon}
                  fallback="tech"
                />
              )}
              {tech.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Image */}
      {project.mainImage && (
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={project.mainImage || principalPlaceHolder}
            alt={`Imagen principal de ${project.name}`}
            fill
            className="object-cover"
          />
        </div>
      )}
      <InfoDetailsCard
        title="Información Técnica"
        content={project.technical_information}
        icon={<Info className="w-5 h-5 text-primary" />}
      />

      {/* Project Story Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Problem */}
        <InfoDetailsCard
          title="Problema"
          content={project.problem}
          className="border-l-4 border-l-destructive"
          icon={<Target className="w-5 h-5 text-destructive" />}
        />

        {/* Solution */}
        <InfoDetailsCard
          title="Solución"
          content={project.solution}
          className="border-l-4 border-l-muted"
          icon={<Lightbulb className="w-5 h-5 text-primary" />}
        />
        {/* Impact */}
        <InfoDetailsCard
          title="Impacto"
          content={project.impact}
          className="border-l-4 border-l-chart-1"
          icon={<TrendingUp className="w-5 h-5 text-chart-1" />}
        />
        {/* Teachings */}
        <InfoDetailsCard
          title="Aprendizajes"
          content={project.teachings}
          className="border-l-4 border-l-chart-2"
          icon={<BookOpen className="w-5 h-5 text-chart-2" />}
        />
      </div>

      {/* Image Gallery */}
      {project.images.length > 0 && (
        <div className="space-y-4">
          <Separator />
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">
              Galería del Proyecto
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer"
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
