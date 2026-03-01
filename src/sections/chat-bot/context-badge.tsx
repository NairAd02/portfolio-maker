import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContextBadgeProps {
  icon: LucideIcon
  label: string
  count: number
  active?: boolean
  className?: string
}

export function ContextBadge({
  icon: Icon,
  label,
  count,
  active = true,
  className,
}: ContextBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "bg-muted text-muted-foreground",
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
      <span
        className={cn(
          "ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none",
          active
            ? "bg-primary text-primary-foreground"
            : "bg-muted-foreground/20 text-muted-foreground"
        )}
      >
        {count}
      </span>
    </span>
  )
}
