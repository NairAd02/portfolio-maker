"use client";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { Button } from "@/components/ui/button";
import { paths } from "@/routes/path";
import useLoggedUser from "@/sections/auth/hooks/use-logged-user";
import { usePathname } from "next/navigation";
import React from "react";
import UserMenu from "./components/user-menu/user-menu";

export default function HeaderNavbar() {
  const { loggedUser, loading } = useLoggedUser();
  const pathname = usePathname();

  if (loading) {
    return (
      <nav className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="h-9 w-24 sm:w-32 rounded bg-muted animate-pulse" />
          <div className="h-9 w-28 sm:w-36 rounded bg-muted animate-pulse" />
        </div>
      </nav>
    );
  }
  return (
    <nav className="flex items-center gap-2 sm:gap-4">
      {!pathname.includes("dashboard") && (
        <div className="flex items-center gap-2 sm:gap-4">
          {!loggedUser && (
            <Button
              className="text-xs sm:text-base"
              variant="outline"
              size="sm"
            >
              Iniciar Sesión
            </Button>
          )}
          <NavigationComponent href={paths.projects.root}>
            <Button
              className="text-xs sm:text-base"
              size="sm"
              variant={"default"}
            >
              {loggedUser ? "Dashboard" : "Empezar"}
            </Button>
          </NavigationComponent>
          
        </div>
      )}
      {loggedUser && <UserMenu />}
    </nav>
  );
}
