import NavigationComponent from "@/components/navigation-component/navigation-component";
import { Button } from "@/components/ui/button";
import { paths } from "@/routes/path";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function LandingHeroSection() {
  return (
    <section className="p-6 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-12 items-center">
          <div className="space-y-4 py-4 lg:space-y-8">
            <div className="space-y-2 lg:space-y-4">
              <h1 className="text-2xl lg:text-4xl xl:text-4xl 2xl:text-6xl font-bold text-primary leading-tight">
                Crea tu portafolio profesional en minutos
              </h1>
              <p className="text-base lg:text-xl text-black font-semibold leading-relaxed">
                PortfolioMaker te ayuda a mostrar tus proyectos, experiencia,
                certificaciones y más de forma intuitiva. Sin código, sin
                complicaciones.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <NavigationComponent href={paths.projects.root}>
                <Button
                  size="lg"
                  variant={"default"}
                  className="lg:text-lg lg:px-8 lg:py-6"
                >
                  Empieza Gratis
                </Button>
              </NavigationComponent>
              <NavigationComponent
                href="https://asura-portfolio.vercel.app/"
                inAnotherTab
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="lg:text-lg lg:px-8 lg:py-6"
                >
                  Ver Demo
                </Button>
              </NavigationComponent>
            </div>
            <div className="flex items-center space-x-6 text-xs lg:text-sm text-slate-500">
              <div className="flex items-center space-x-1">
                <Check className="w-4 h-4 text-green-500" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="w-4 h-4 text-green-500" />
                <span>Setup en 5 minutos</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/images/og-image-home.png"
                alt="Portfolio example on laptop"
                width={1200}
                height={450}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
