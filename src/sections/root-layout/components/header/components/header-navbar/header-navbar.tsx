"use client";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { Button } from "@/components/ui/button";
import { paths } from "@/routes/path";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import UserMenu from "./components/user-menu/user-menu";
import { LoggedUserContext } from "@/sections/auth/context/logged-user-context";

export default function HeaderNavbar() {
  const { loggedUser, loading } = useContext(LoggedUserContext);
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
            <NavigationComponent href={paths.sign_in.root}>
              <Button
                className="text-xs sm:text-base"
                variant="outline"
                size="sm"
              >
                Iniciar Sesión
              </Button>
            </NavigationComponent>
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
