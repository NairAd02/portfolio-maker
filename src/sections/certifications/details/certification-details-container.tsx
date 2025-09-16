import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Award, Building2 } from "lucide-react";
import Image from "next/image";
import { CertificationDetails } from "@/lib/types/certifications";
import { principalPlaceHolder } from "@/lib/place-holders";
import { formatDate, getDateDuration } from "@/lib/format-date";
import NavigationComponent from "@/components/navigation-component/navigation-component";

interface Props {
  certification: CertificationDetails;
}

export function CertificationDetailsContainer({ certification }: Props) {
  return (
    <div>
      <div className="space-y-4 mb-2">
        <p className="text-2xl font-bold text-balance leading-tight">
          {certification.title}
        </p>
      </div>

      <div className="space-y-6">
        {/* Image Section */}

        <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
          <Image
            src={certification.image || principalPlaceHolder}
            alt={`Certificación ${certification.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Institution and Duration */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-foreground">
            <Building2 className="h-5 w-5" />
            <span className="text-lg font-medium">
              {certification.institution}
            </span>
          </div>
        </div>

        {/* Date Information */}
        <div className="flex items-center px-6 justify-between w-full gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Calendar className="h-4 w-4" />
              <span>Fecha de inicio</span>
            </div>
            <p className="text-base font-medium">
              {formatDate(certification.startdate)}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Calendar className="h-4 w-4" />
              <span>Fecha de finalización</span>
            </div>
            <p className="text-base font-medium">
              {formatDate(certification.enddate)}
            </p>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="flex justify-center">
          <Badge variant="outline" className="text-sm px-4 py-2">
            Duración:{" "}
            {getDateDuration(certification.startdate, certification.enddate)}
          </Badge>
        </div>

        {/* Description Section */}
        {certification.description && (
          <div className="bg-card rounded-lg p-6 border">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Detalles de la Certificación
            </h3>
            <p className="text-foreground leading-relaxed">
              {certification.description}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          {certification.link && (
            <NavigationComponent href={certification.link} inAnotherTab>
              <Button className="flex-1 gap-2">
                <ExternalLink className="h-4 w-4" />
                Ver Certificación
              </Button>
            </NavigationComponent>
          )}
        </div>
      </div>
    </div>
  );
}
