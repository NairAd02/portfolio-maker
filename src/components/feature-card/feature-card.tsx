import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Folder } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface Props {
  feature: Feature;
}

export default function FeatureCard({ feature }: Props) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-primary/40 hover:border-l-primary border-t-4 border-t-primary/40 hover:border-t-primary">
      <CardHeader>
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
          {feature.icon || <Folder className="w-6 h-6 text-white" />}
        </div>
        <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-black font-semibold">{feature.description}</p>
      </CardContent>
    </Card>
  );
}
