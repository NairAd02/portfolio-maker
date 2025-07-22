import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 24, className }: Props) {
  return (
    <div className="p-2">
      <Loader2
        className={cn("animate-spin text-muted-foreground", className)}
        size={size}
      />
    </div>
  );
}
