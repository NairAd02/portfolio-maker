import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  count: number;
  description: string;
  variant?: "default" | "secondary" | "accent";
}

export function SectionStats({
  icon: Icon,
  title,
  count,
  description,
  variant = "default",
}: Props) {
  const variantStyles = {
    default: "bg-primary/5 border-primary/20 text-primary",
    secondary: "bg-secondary/5 border-secondary/20 text-secondary-foreground",
    accent: "bg-accent/5 border-accent/20 text-accent-foreground",
  };

  return (
    <Card
      className={`${variantStyles[variant]} border transition-colors hover:bg-opacity-80`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-current/10 rounded-lg flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-sm">{title}</p>
              <p className="text-xs opacity-70">{description}</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-background/50 border-current/20"
          >
            {count}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
