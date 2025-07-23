"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Settings, HelpCircle, ChevronRight } from "lucide-react"
import SignOutButton from "./components/sign-out-button/sign-out-button"
import { Skeleton } from "@/components/ui/skeleton"
import { useCallback, useMemo } from "react"
import useLoggedUser from "@/sections/auth/hooks/use-logged-user"

export default function UserMenu() {
  const { loggedUser, loading, error } = useLoggedUser()

  const userInitials = useMemo(() => {
    if (!loggedUser?.email) return "?"

    // Handle email format for initials
    const emailParts = loggedUser.email.split("@")[0]
    const nameParts = emailParts.split(/[._-]/)

    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
    }

    return emailParts.slice(0, 2).toUpperCase()
  }, [loggedUser?.email])

  const handleOpenProfileModal = useCallback(() => {
    // Implementar lógica del modal de perfil
    console.log("Opening profile modal")
  }, [])

  const handleOpenSettings = useCallback(() => {
    // Implementar lógica de configuración
    console.log("Opening settings")
  }, [])

  const handleOpenHelp = useCallback(() => {
    // Implementar lógica de ayuda
    console.log("Opening help")
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    )
  }

  if (!loggedUser || error) {
    return (
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
        <User className="h-4 w-4" />
      </div>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-accent/50 transition-colors duration-200"
          aria-label="Menú de usuario"
        >
          <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-sm">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-0 shadow-lg border-0 bg-background/95 backdrop-blur-sm"
        align="end"
        sideOffset={8}
      >
        {/* Header del usuario */}
        <div className="p-4 border-b bg-gradient-to-r from-muted/50 to-muted/30">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">
                {loggedUser.email?.split("@")[0] || "Usuario"}
              </p>
              <p className="text-xs text-muted-foreground truncate">{loggedUser.email || "email@ejemplo.com"}</p>
              <Badge variant="secondary" className="mt-1 text-xs">
                Activo
              </Badge>
            </div>
          </div>
        </div>

        {/* Opciones del menú */}
        <div className="p-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-between h-10 px-3 hover:bg-accent/50 transition-colors"
              onClick={handleOpenProfileModal}
            >
              <div className="flex items-center">
                <User className="mr-3 h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Ver perfil</span>
              </div>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between h-10 px-3 hover:bg-accent/50 transition-colors"
              onClick={handleOpenSettings}
            >
              <div className="flex items-center">
                <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Configuración</span>
              </div>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between h-10 px-3 hover:bg-accent/50 transition-colors"
              onClick={handleOpenHelp}
            >
              <div className="flex items-center">
                <HelpCircle className="mr-3 h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Ayuda y soporte</span>
              </div>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </Button>
          </div>
        </div>

        <Separator className="my-2" />

        {/* Botón de cerrar sesión */}
        <div className="p-2">
          <SignOutButton />
        </div>
      </PopoverContent>
    </Popover>
  )
}
