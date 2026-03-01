import { SendHorizonal, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  showTyping?: boolean
  className?: string
}

export function ChatInput({ showTyping = true, className }: ChatInputProps) {
  return (
    <div className={cn("border-t border-border bg-background px-4 pb-4 pt-3", className)}>
      {/* Typing indicator */}
      {showTyping && (
        <div className="mb-2 flex items-center gap-2 px-1">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
          <span className="text-xs text-muted-foreground">
            El asistente esta escribiendo...
          </span>
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-2 shadow-sm transition-colors focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20">
        <textarea
          readOnly
          rows={1}
          placeholder="Escribe un mensaje o pregunta sobre tu portfolio..."
          className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          defaultValue=""
        />
        <button
          disabled
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors disabled:opacity-40"
          aria-label="Enviar mensaje"
        >
          <SendHorizonal className="h-4 w-4" />
        </button>
      </div>

      {/* Footnote */}
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        El asistente utiliza tu informacion del portfolio como contexto
      </p>
    </div>
  )
}
