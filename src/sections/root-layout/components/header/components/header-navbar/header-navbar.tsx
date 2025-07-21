import { Button } from "@/components/ui/button";
import React from "react";

export default function HeaderNavbar() {
  return (
    <nav className="flex items-center gap-2 sm:gap-4">
      <Button className="text-xs sm:text-base" variant="outline" size="sm">
        Iniciar Sesión
      </Button>
      <Button className="text-xs sm:text-base" size="sm" variant={"default"}>
        Empieza Gratis
      </Button>
    </nav>
  );
}
