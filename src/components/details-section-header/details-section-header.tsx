import NavigationComponent from "../navigation-component/navigation-component";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  href: string;
  title: string;
  description: string;
}

export default function DetailsSectionHeader({
  href,
  title,
  description,
}: Props) {
  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center bg-white rounded-lg shadow-sm gap-4 p-6 overflow-hidden">
      {/* Panel azul diagonal superpuesto */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-primary opacity-90"
        style={{
          clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Contenido principal con z-index para estar por encima */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 w-full">
        <NavigationComponent href={href}>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-white text-black border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
        </NavigationComponent>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
