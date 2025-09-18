import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/format-date";
import { Certification } from "@/lib/types/certifications";
import { Award, Building2, Calendar } from "lucide-react";
import React from "react";
import ViewDetailsCertificationButton from "./components/view-certification-details-button";

interface Props {
  data: Certification;
}

export default function CertificationCard({ data: certification }: Props) {
  return (
    <Card
      key={certification.id}
      className="hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="flex-1 ml-3">
            <CardTitle className="text-lg text-balance leading-tight group-hover:text-primary transition-colors">
              {certification.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-2">
              <Building2 className="h-4 w-4" />
              {certification.institution}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar className="h-4 w-4" />
          <span>
            {formatDate(certification.startdate)} -{" "}
            {formatDate(certification.enddate)}
          </span>
        </div>

        <div className="z-30">
          <div className="relative z-20">
            <ViewDetailsCertificationButton
              certificationId={certification.id}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
