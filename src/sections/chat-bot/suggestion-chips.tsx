import { Sparkles, FileText, Briefcase, Search, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const suggestions = [
  { icon: Sparkles, label: "Genera mi CV" },
  { icon: FileText, label: "Resume mi experiencia" },
  { icon: Briefcase, label: "Carta de presentacion" },
  { icon: Search, label: "Que proyectos tengo?" },
  { icon: BarChart3, label: "Analiza mi perfil" },
]

export function SuggestionChips({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 scrollbar-none",
        className
      )}
    >
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.label}
          className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <suggestion.icon className="h-3.5 w-3.5 text-primary" />
          {suggestion.label}
        </button>
      ))}
    </div>
  )
}
