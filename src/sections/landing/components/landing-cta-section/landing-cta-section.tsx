import { Button } from "@/components/ui/button";
import React from "react";

export default function LandingCtaSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            ¿Listo para crear tu portafolio profesional?
          </h2>
          <p className="text-xl text-blue-100">
            Únete a miles de profesionales que ya destacan con PortfolioMaker
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Empieza Gratis Ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
