"use client";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { Button } from "@/components/ui/button";
import { paths } from "@/routes/path";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderNavbar() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-2 sm:gap-4">
      {!pathname.includes("dashboard") && (
        <div className="flex items-center gap-2 sm:gap-4">
          <Button className="text-xs sm:text-base" variant="outline" size="sm">
            Iniciar Sesión
          </Button>
          <NavigationComponent href={paths.proyects.root}>
            <Button
              className="text-xs sm:text-base"
              size="sm"
              variant={"default"}
            >
              Empieza Gratis
            </Button>
          </NavigationComponent>
        </div>
      )}
    </nav>
  );
}
