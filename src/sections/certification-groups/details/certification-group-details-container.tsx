import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Award, GraduationCap } from "lucide-react";
import { CertificationGroupDetails } from "@/lib/types/certification-groups";
import CertificationCard from "@/sections/certifications/components/certification-card/certification-card";

interface Props {
  certificationGroup: CertificationGroupDetails;
}

export default function CertificationGroupDetailsContainer({
  certificationGroup,
}: Props) {
  return (
    <div>
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-2xl font-bold text-balance">
              {certificationGroup.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Award className="h-4 w-4" />
              <span>
                {certificationGroup.certifications.length} certificación
                {certificationGroup.certifications.length !== 1 ? "es" : ""}
              </span>
              <Badge variant="default" className="ml-2">
                Grupo de Certificaciones
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-sm text-foreground mt-6 mb-6">
          Explora todas las certificaciones incluidas en este grupo profesional.
        </div>

        <Separator className="my-4" />

        {certificationGroup.certifications.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {certificationGroup.certifications.map((certification, index) => (
              <div key={certification.id} className="relative">
                <CertificationCard data={certification} />
                {index < certificationGroup.certifications.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-px bg-border" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              No hay certificaciones
            </h3>
            <p className="text-sm text-muted-foreground">
              Este grupo aún no tiene certificaciones asociadas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
