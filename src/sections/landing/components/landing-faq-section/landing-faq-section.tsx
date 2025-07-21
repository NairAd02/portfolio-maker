import AccordionContainer from "@/components/ui/accordion-container";
import { Faq } from "@/lib/types/faqs";
import React from "react";

export const faqs: Faq[] = [
  {
    question: "¿Necesito conocimientos técnicos para usar PortfolioMaker?",
    response:
      "No, PortfolioMaker está diseñado para ser completamente intuitivo. No necesitas saber programación ni diseño. Nuestro editor visual te permite crear un portafolio profesional simplemente arrastrando y soltando elementos.",
  },
  {
    question: "¿Puedo usar mi propio dominio?",
    response:
      "Sí, con los planes Profesional y Premium puedes conectar tu propio dominio personalizado. Te guiamos paso a paso en el proceso de configuración para que sea súper sencillo.",
  },
  {
    question: "¿Mis datos están seguros?",
    response:
      "Absolutamente. Utilizamos encriptación SSL de grado bancario y cumplimos con todas las regulaciones de privacidad. Tus datos nunca se comparten con terceros y tienes control total sobre tu información.",
  },
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    response:
      "Sí, puedes actualizar o degradar tu plan cuando quieras. Los cambios se aplican inmediatamente y solo pagas la diferencia prorrateada. No hay penalizaciones por cambiar de plan.",
  },
  {
    question: "¿Ofrecen soporte técnico?",
    response:
      "Sí, ofrecemos soporte por email para todos los usuarios. Los usuarios Premium tienen acceso a soporte prioritario con respuesta en menos de 24 horas. También tenemos una base de conocimientos completa y tutoriales en video.",
  },
];

export default function LandingFaqSection() {
  return (
    <section id="faq" className="py-20 p bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-black font-semibold">
            Resolvemos tus dudas más comunes
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <AccordionContainer
            items={faqs.map((faq, index) => ({
              value: index.toString(),
              trigger: faq.question,
              content: faq.response,
              className: "border rounded-lg px-6",
              classNameTrigger: "text-left",
              classNameContent: "text-black",
            }))}
          />
        </div>
      </div>
    </section>
  );
}
