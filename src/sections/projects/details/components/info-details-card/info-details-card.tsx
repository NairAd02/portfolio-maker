import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import React, { ReactNode } from "react";

interface Props {
  title: string;
  content: string;
  icon?: ReactNode;
  className?: string;
}

export default function InfoDetailsCard({
  title,
  content,
  icon,
  className,
}: Props) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {icon || <Lightbulb className="w-5 h-5 text-primary" />}
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <p className="text-muted-foreground text-pretty leading-relaxed">
          {content}
        </p>
      </CardContent>
    </Card>
  );
}
