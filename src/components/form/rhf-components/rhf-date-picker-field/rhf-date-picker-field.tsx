"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  fullWidth?: boolean;
  allowClear?: boolean; // Nuevo: para habilitar botón "Limpiar"
}

export function RHFDatePickerField({
  name,
  label,
  placeholder = "Selecciona una fecha",
  description,
  fullWidth = true,
  allowClear = true,
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("flex relative flex-col", fullWidth && "w-full")}
        >
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                    fullWidth && "w-full"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP", { locale: es })
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            {field.value && allowClear && (
              <X
                className="ml-auto absolute right-10 top-8 h-4 w-4 opacity-70 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  field.onChange(null);
                }}
              />
            )}
            <PopoverContent className="w-auto p-2" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  // Si se selecciona la misma fecha => deselecciona
                  if (
                    field.value &&
                    date &&
                    field.value.toDateString() === date.toDateString()
                  ) {
                    field.onChange(null);
                  } else {
                    field.onChange(date);
                  }
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
              {allowClear && field.value && (
                <div className="mt-2 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => field.onChange(null)}
                  >
                    Limpiar
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
