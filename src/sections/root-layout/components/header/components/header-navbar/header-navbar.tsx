import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function HeaderNavbar() {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link
        href="#caracteristicas"
        className="text-slate-600 hover:text-blue-600 transition-colors"
      >
        Características
      </Link>
      <Link
        href="#precios"
        className="text-slate-600 hover:text-blue-600 transition-colors"
      >
        Precios
      </Link>
      <Link
        href="#faq"
        className="text-slate-600 hover:text-blue-600 transition-colors"
      >
        FAQ
      </Link>
      <Button variant="outline" size="sm">
        Iniciar Sesión
      </Button>
      <Button
        size="sm"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        Empieza Gratis
      </Button>
    </nav>
  );
}
