"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { PlusIcon, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { AlertCircle } from "lucide-react"; // Icono opcional para errores

interface Props<T> {
  name: string;
  label?: string;
  emptyText?: string;
  StackComponent: React.ComponentType<{ index: number }>;
  newItem: T;
  addButtonLabel?: string;
  className?: string;
}

export function RHFListField<T>({
  name,
  label = "Elementos",
  emptyText = "No hay datos",
  StackComponent,
  newItem,
  addButtonLabel = "Agregar",
  className,
}: Props<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  const handleAddItem = useCallback(() => {
    append(newItem);
  }, [append, newItem]);

  // Obtener error raíz del array
  const fieldError = errors[name] as { message?: string } | undefined;

  return (
    <Card className="bg-white">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{label}</CardTitle>
          <Button
            size="sm"
            variant="default"
            onClick={handleAddItem}
            type="button"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            {addButtonLabel}
          </Button>
        </div>

        {fieldError?.message && (
          <div className="flex items-center gap-1 text-destructive text-sm mt-2">
            <AlertCircle className="h-4 w-4" />
            <span>{fieldError.message}</span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className={"space-y-3 overflow-auto " + className}>
          {fields.length > 0 ? (
            fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-3 p-3 bg-white border rounded-lg"
              >
                <div className="flex-1">
                  <StackComponent index={index} />
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() => remove(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              {emptyText}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
