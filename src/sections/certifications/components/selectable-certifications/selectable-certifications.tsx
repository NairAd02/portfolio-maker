"use client";
import { Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSelectablePerfumes from "./hooks/use-selectable-certifications";
import { Certification } from "@/lib/types/certifications";
import CertificationCard from "../certification-card/certification-card";
import EmptyContent from "@/components/empty-content/empty-content";

interface Props {
  certifications: Certification[];
  action: (certifications: Certification[]) => void;
}

export default function SelectableCertifications({
  certifications,
  action,
}: Props) {
  const { selectedCertifications, toggleSelection, handleAction } =
    useSelectablePerfumes({ action });
  return (
    <div className="flex flex-col flex-1 h-full gap-4 p-2">
      <h3 className="font-medium text-lg mb-3">
        Seleccione los perfumes que desea
      </h3>
      <div className="flex flex-col flex-1 gap-4 justify-between h-full">
        {certifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 max-h-[55vh] overflow-auto">
            {certifications.map((certification) => (
              <div
                key={certification.id}
                className="relative cursor-pointer group"
                onClick={() => toggleSelection(certification)}
              >
                <div
                  className={`
              absolute inset-0 z-10 transition-all duration-200
              ${
                selectedCertifications.includes(certification)
                  ? "bg-black/10 border-2 border-primary rounded-lg"
                  : "bg-transparent hover:bg-black/5 rounded-lg"
              }
            `}
                >
                  {selectedCertifications.find(
                    (selectedCertification) =>
                      selectedCertification.id === certification.id
                  ) && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <CertificationCard data={certification} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyContent
            title="No hay certificaciones disponibles para seleccionar"
            description="No fue encontrada la información de ninguna certificación o ya ha seleccionado todos las certificaciones disponibles"
          />
        )}

        {selectedCertifications.length > 0 && (
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={handleAction}
              className="flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Seleccionar {selectedCertifications.length} certificación
              {selectedCertifications.length !== 1 ? "s" : ""}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
