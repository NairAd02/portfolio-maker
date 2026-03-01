import { Bot, Sparkles } from "lucide-react"
import { SuggestionChips } from "./suggestion-chips"
import { cn } from "@/lib/utils"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"

const mockMessages = [
  {
    role: "assistant" as const,
    content:
      "Hola! Soy tu asistente de portfolio. Tengo acceso a tus <strong>proyectos</strong>, <strong>experiencias laborales</strong> y <strong>educacion</strong>. Puedo ayudarte a generar CVs, cartas de presentacion, resumenes profesionales y mucho mas. Que necesitas hoy?",
    timestamp: "10:30 AM",
  },
  {
    role: "user" as const,
    content:
      "Necesito un resumen profesional basado en mi experiencia para aplicar a un puesto de Senior Frontend Developer.",
    timestamp: "10:32 AM",
  },
  {
    role: "assistant" as const,
    content: `Basandome en tu perfil, aqui tienes un resumen profesional:<br/><br/>
<strong>Resumen Profesional</strong><br/><br/>
Desarrollador Frontend Senior con <strong>5+ anos de experiencia</strong> construyendo aplicaciones web modernas y escalables. Especializado en:<br/><br/>
<ul style="list-style:disc;padding-left:1.25rem;margin-top:0.25rem;margin-bottom:0.25rem;">
<li><strong>React y Next.js</strong> — Desarrollo de SPAs y aplicaciones SSR de alto rendimiento</li>
<li><strong>TypeScript</strong> — Codigo tipado seguro en proyectos de gran escala</li>
<li><strong>Sistemas de diseno</strong> — Creacion de librerias de componentes reutilizables</li>
<li><strong>Liderazgo tecnico</strong> — Mentoria de equipos y definicion de arquitectura</li>
</ul><br/>
Con experiencia demostrada en <strong>6 proyectos destacados</strong> incluyendo e-commerce, dashboards analytics y plataformas SaaS. Formacion en Ingenieria de Software por la Universidad Politecnica.<br/><br/>
Quieres que ajuste el tono, la longitud o algun enfoque en particular?`,
    timestamp: "10:33 AM",
  },
  {
    role: "user" as const,
    content:
      "Perfecto! Ahora hazlo mas conciso, maximo 3 lineas, para incluirlo en la cabecera de mi CV.",
    timestamp: "10:35 AM",
  },
]

interface ChatWindowProps {
  showMessages?: boolean
  className?: string
}

export function ChatWindow({
  showMessages = true,
  className,
}: ChatWindowProps) {
  return (
    <div className={cn("flex h-full flex-col bg-background", className)}>
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Asistente de Portfolio
          </h2>
          <p className="text-xs text-muted-foreground">
            Conectado con tu informacion profesional
          </p>
        </div>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        {showMessages ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-6">
            {mockMessages.map((msg, i) => (
              <ChatMessage
                key={i}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex h-full flex-col items-center justify-center px-6">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              Tu asistente de portfolio
            </h3>
            <p className="mb-8 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
              Preguntame cualquier cosa sobre tu perfil profesional. Puedo
              generar CVs, resumenes, cartas de presentacion y analizar tu
              trayectoria.
            </p>
            <SuggestionChips />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mx-auto w-full max-w-3xl">
        <ChatInput showTyping={showMessages} />
      </div>

      {/* Suggestion chips below input when messages are visible */}
      {showMessages && (
        <div className="mx-auto w-full max-w-3xl px-4 pb-3">
          <SuggestionChips />
        </div>
      )}
    </div>
  )
}
