import AvatarContainer from "@/components/ui/avatar-container";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format-date";
import { principalPlaceHolder } from "@/lib/place-holders";
import {
  ExperienceDetails,
  getExperienceDuration,
} from "@/lib/types/experiences";
import { Award, Calendar, Code, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  experience: ExperienceDetails;
}

export default function ExperienceDetailsContainer({ experience }: Props) {
  return (
    <div>
      <div className="space-y-4">
        <div className="flex-1">
          <p className="text-2xl font-bold text-primary mb-2">
            {experience.company}
          </p>
          <h3 className="text-xl font-semibold text-foreground mb-1">
            {experience.position}
          </h3>
          <div className="flex items-center gap-4 text-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {formatDate(experience.startdate)} -{" "}
                {experience.enddate === "present"
                  ? "Presente"
                  : formatDate(experience.enddate)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {getExperienceDuration(
                  experience.startdate,
                  experience.enddate
                )}
              </span>
            </div>
          </div>
        </div>

        {experience.mainImage && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
            <Image
              src={experience.mainImage || principalPlaceHolder}
              alt={`${experience.company} logo`}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="space-y-6 mt-6">
        {/* Descripción */}
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full"></div>
            Descripción del Rol
          </h4>
          <p className="text-foreground leading-relaxed">
            {experience.description}
          </p>
        </div>

        {/* Logros */}
        {experience.achievements.length > 0 && (
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Logros Principales
            </h4>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <span className="text-foreground leading-relaxed">
                    {achievement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tecnologías */}
        {experience.technologies.length > 0 && (
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Tecnologías Utilizadas
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <Badge
                  key={tech.id}
                  variant="default"
                  className="hover:bg-accent hover:text-accent-foreground transition-colors"
                >
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
        )}
      </div>
    </div>
  );
}
