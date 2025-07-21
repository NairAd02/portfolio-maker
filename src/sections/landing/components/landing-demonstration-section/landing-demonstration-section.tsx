import ExampleCard, { Example } from "@/components/example-card/example-card";
import React from "react";

const examples: Example[] = [
  {
    title: "Minimalista",
    description: "Diseño limpio y elegante",
    image: "/images/place-holder.jpg",
  },
  {
    title: "Creativo",
    description: "Colores vibrantes y dinámico",
    image: "/images/place-holder.jpg",
  },
  {
    title: "Corporativo",
    description: "Profesional y confiable",
    image: "/images/place-holder.jpg",
  },
];

export default function LandingDemostrationSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Elige entre múltiples diseños personalizables
          </h2>
          <p className="text-xl text-black font-semibold">
            Plantillas profesionales diseñadas para diferentes industrias y
            estilos
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <ExampleCard key={index} example={example} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
