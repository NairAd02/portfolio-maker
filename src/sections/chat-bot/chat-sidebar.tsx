import {
  Plus,
  FolderKanban,
  Briefcase,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  Check,
} from "lucide-react"
import { ContextBadge } from "./context-badge"
import { cn } from "@/lib/utils"

const contextSections = [
  { icon: FolderKanban, label: "Proyectos", count: 6, active: true },
  { icon: Briefcase, label: "Experiencias", count: 4, active: true },
  { icon: Lightbulb, label: "Habilidades", count: 12, active: false },
  { icon: GraduationCap, label: "Educacion", count: 3, active: true },
]

const conversations = [
  { id: 1, title: "Generar CV para frontend", date: "Hace 2 horas" },
  { id: 2, title: "Carta de presentacion Google", date: "Ayer" },
  { id: 3, title: "Resumen de experiencia", date: "23 Feb 2026" },
  { id: 4, title: "Analisis de perfil profesional", date: "20 Feb 2026" },
]

export function ChatSidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "flex h-full w-[280px] flex-col border-r border-border bg-sidebar text-sidebar-foreground",
        className
      )}
    >
      {/* New conversation button */}
      <div className="p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Nueva conversacion
        </button>
      </div>

      {/* Context sections */}
      <div className="px-4 pb-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Contexto disponible
          </h3>
        </div>
        <div className="space-y-1">
          {contextSections.map((section) => (
            <div
              key={section.label}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent",
                section.active && "bg-sidebar-accent"
              )}
            >
              <div className="flex items-center gap-2.5">
                <section.icon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{section.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold",
                    section.active
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {section.count}
                </span>
                {section.active && (
                  <Check className="h-3.5 w-3.5 text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 px-1 text-[11px] text-muted-foreground">
          Selecciona las secciones que el asistente usara como contexto.
        </p>
      </div>

      <div className="mx-4 border-t border-border" />

      {/* Conversation history */}
      <div className="flex flex-1 flex-col overflow-hidden px-4 pt-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Historial
        </h3>
        <div className="flex-1 space-y-0.5 overflow-y-auto">
          {conversations.map((conv, index) => (
            <div
              key={conv.id}
              className={cn(
                "group flex cursor-pointer items-start gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-sidebar-accent",
                index === 0 && "bg-sidebar-accent"
              )}
            >
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-medium">{conv.title}</span>
                <span className="text-[11px] text-muted-foreground">
                  {conv.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active context badges at bottom */}
      <div className="border-t border-border p-4">
        <p className="mb-2 text-[11px] font-medium text-muted-foreground">
          Contexto activo
        </p>
        <div className="flex flex-wrap gap-1.5">
          {contextSections
            .filter((s) => s.active)
            .map((s) => (
              <ContextBadge
                key={s.label}
                icon={s.icon}
                label={s.label}
                count={s.count}
                active
              />
            ))}
        </div>
      </div>
    </aside>
  )
}
