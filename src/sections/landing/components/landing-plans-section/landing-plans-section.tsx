import PlanCard, { Plan } from "@/components/plan-card/plan-card";
import React from "react";

export const plans: Plan[] = [
  {
    title: "Gratuito",
    price: 0,
    stage: "Para empezar",
    startText: "Comenzar Gratis",
    features: [
      "1 portafolio público",
      "5 proyectos máximo",
      "Plantillas básicas",
      "Subdominio PortfolioMaker",
    ],
  },
  {
    title: "Profesional",
    price: 9,
    stage: "por mes",
    startText: "Elegir Profesional",
    features: [
      "3 portafolios",
      "Proyectos ilimitados",
      "Todas las plantillas",
      "Dominio personalizado",
      "Analytics básicos",
    ],
  },
  {
    title: "Premium",
    price: 19,
    stage: "por mes",
    startText: "Elegir Premium",
    features: [
      "Portafolios ilimitados",
      "Todo de Profesional",
      "Plantillas premium",
      "Analytics avanzados",
      "Soporte prioritario",
    ],
  },
];

export default function LandingPlansSection() {
  return (
    <section id="precios" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Planes para cada necesidad
          </h2>
          <p className="text-xl text-black font-semibold">
            Comienza gratis y escala según tus necesidades profesionales
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
