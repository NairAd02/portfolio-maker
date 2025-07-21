import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import AppLogo from "@/components/app-logo/app-logo";

export default function Footer() {
  return (
    <footer className="bg-muted text-black py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <AppLogo />
              <span className="text-xl text-primary font-bold">PortfolioMaker</span>
            </div>
            <p className="text-black font-semibold">
              La plataforma más fácil para crear portafolios profesionales que
              realmente destacan.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-black font-semibold hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-black font-semibold hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-black font-semibold hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-black font-semibold hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Producto</h3>
            <ul className="space-y-2 text-black font-semibold">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Plantillas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Ejemplos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Soporte</h3>
            <ul className="space-y-2 text-black font-semibold">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Tutoriales
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Estado del Servicio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-black font-semibold">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black font-semibold">
            © {new Date().getFullYear()} PortfolioMaker. Todos los derechos
            reservados.
          </p>
          <p className="text-black font-semibold text-sm">
            Hecho con amor para profesionales que quieren destacar
          </p>
        </div>
      </div>
    </footer>
  );
}
