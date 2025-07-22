"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AlertCircleIcon } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label?: string;
  description?: string;
  options: SelectOption[];
  columns?: number; // opcional: número de columnas
  maxHeight?: string; // opcional: altura máxima para scroll
  loading?: boolean;
  emptyText?: string;
}
const columnClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
};

export function RHFMultiSelectField({
  name,
  label,
  description,
  options,
  columns = 2,
  maxHeight = "max-h-60",
  loading = false,
  emptyText = "No hay datos",
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const handleCheckboxChange = (checked: boolean, value: string) => {
          const current = new Set(field.value || []);
          if (checked) {
            current.add(value);
          } else {
            current.delete(value);
          }
          field.onChange(Array.from(current));
        };

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              {!loading ? (
                options.length > 0 ? (
                  <div
                    className={`grid ${columnClasses[columns]} gap-2 border rounded-md p-3 ${maxHeight} overflow-y-auto`}
                  >
                    {options.map((option) => (
                      <FormItem
                        key={option.value}
                        className="flex items-center gap-2 space-y-0"
                      >
                        <Checkbox
                          id={`${name}-${option.value}`}
                          checked={field.value?.includes(option.value)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(!!checked, option.value)
                          }
                        />
                        <label
                          htmlFor={`${name}-${option.value}`}
                          className="text-sm"
                        >
                          {option.label}
                        </label>
                      </FormItem>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full gap-2 p-2">
                    <AlertCircleIcon />
                    {emptyText}
                  </div>
                )
              ) : (
                <div className="mx-auto">
                  <LoadingSpinner />
                </div>
              )}
            </FormControl>
            {description && options.length > 0 && (
              <FormDescription>{description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
