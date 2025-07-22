import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleRemove: () => void;
}

export default function DeselectionMask({ children, handleRemove }: Props) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 z-10 transition-all duration-200 rounded-lg bg-transparent group-hover:bg-black/5 flex items-center justify-center">
        <Button
          type="button"
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
          aria-label="Eliminar elemento"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </div>
  );
}
