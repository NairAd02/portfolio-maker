import FeatureCard, { Feature } from "@/components/feature-card/feature-card";
import {
  Award,
  Briefcase,
  FileText,
  Folder,
  ImageIcon,
  Mail,
} from "lucide-react";
import React from "react";

export const features: Feature[] = [
  {
    title: "Añade tus proyectos",
    description:
      "Muestra miniaturas de proyectos desarrollados o en los que has colaborado con descripciones detalladas.",
    icon: <Folder className="w-6 h-6 text-white" />,
  },
  {
    title: "Publicaciones y blogs",
    description:
      "Espacio dedicado para tus artículos, entradas de blog, papers y contenido técnico.",
    icon: <FileText className="w-6 h-6 text-white" />,
  },
  {
    title: "Experiencia profesional",
    description:
      "Ingresa tu trayectoria como informático de forma intuitiva y rápida con timeline interactivo.",
    icon: <Briefcase className="w-6 h-6 text-white" />,
  },
  {
    title: "Certificaciones",
    description:
      "Lista y muestra logos de tus credenciales, cursos completados y certificaciones profesionales.",
    icon: <Award className="w-6 h-6 text-white" />,
  },
  {
    title: "Contacto",
    description:
      "Formulario simple con email, LinkedIn y otros enlaces profesionales para que te contacten fácilmente.",
    icon: <Mail className="w-6 h-6 text-white" />,
  },
  {
    title: "Multimedia",
    description:
      " Sube imágenes, vídeos y otros contenidos para enriquecer tu portafolio y hacerlo más atractivo.",
    icon: <ImageIcon className="w-6 h-6 text-white" />,
  },
];

export default function LandingFeaturesSection() {
  return (
    <section id="caracteristicas" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Todo lo que necesitas para destacar
          </h2>
          <p className="text-xl text-black font-semibold max-w-2xl mx-auto">
            Herramientas profesionales para crear un portafolio que realmente
            represente tu talento
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
