import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import React from "react";
import PersonalInformationFormContainer from "./form/personal-information-form-container";
import { getPersonalInformationReport } from "@/lib/services/portfolio";

export default async function PersonalInformationContainer() {
  const res = await getPersonalInformationReport();

  if (!res.data || res.error)
    return <div>No fue posible cargar el reporte</div>;

  const personalInformationReport = res.data;

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Información Personal</CardTitle>
            <CardDescription>
              Configura tu nombre, foto y frase introductoria
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <PersonalInformationFormContainer
          personalInformationReport={personalInformationReport}
        />
      </CardContent>
    </Card>
  );
}
