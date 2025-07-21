import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Check,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import LandingHeroSection from "./components/landing-hero-section/landing-hero-section";
import LandingFeaturesSection from "./components/landing-features-section/landing-features-section";
import LandingDemostrationSection from "./components/landing-demonstration-section/landing-demonstration-section";
import LandingReviewsSection from "./components/landing-reviews-section/landing-reviews-section";
import LandingPlansSection from "./components/landing-plans-section/landing-plans-section";
import LandingFaqSection from "./components/landing-faq-section/landing-faq-section";
import LandingCtaSection from "./components/landing-cta-section/landing-cta-section";

export default function LandingContainer() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <LandingHeroSection />

      {/* Features */}
      <LandingFeaturesSection />

      {/* Demostration */}
      <LandingDemostrationSection />

      {/* Reviews */}
      <LandingReviewsSection />

      {/* Plans and Prices */}
      <LandingPlansSection />

      {/* FAQ */}
      <LandingFaqSection />

      {/* CTA Final */}
      <LandingCtaSection />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PM</span>
                </div>
                <span className="text-xl font-bold">PortfolioMaker</span>
              </div>
              <p className="text-slate-400">
                La plataforma más fácil para crear portafolios profesionales que
                realmente destacan.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Plantillas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Ejemplos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tutoriales
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Estado del Servicio
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">
              © {new Date().getFullYear()} PortfolioMaker. Todos los derechos
              reservados.
            </p>
            <p className="text-slate-400 text-sm">
              Hecho con ❤️ para profesionales que quieren destacar
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
