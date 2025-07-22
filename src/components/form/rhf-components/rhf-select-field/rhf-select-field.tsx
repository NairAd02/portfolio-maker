"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircleIcon, XIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
  fullWidth?: boolean;
  loading?: boolean;
  emptyText?: string;
  clearable?: boolean; 
}

export function RHFSelectField({
  name,
  label,
  placeholder,
  description,
  options,
  fullWidth = true,
  loading = false,
  emptyText = "No hay datos",
  clearable = false, 
}: Props) {
  const { control, setValue } = useFormContext();

  const handleClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${fullWidth ? "w-full" : ""}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={loading}
              >
                <SelectTrigger className={`${fullWidth ? "w-full" : ""}`}>
                  <SelectValue
                    placeholder={
                      loading ? "Cargando..." : placeholder || "Selecciona"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.length > 0 ? (
                    options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="flex gap-2 p-2">
                      <AlertCircleIcon />
                      {emptyText}
                    </div>
                  )}
                </SelectContent>
              </Select>
              {clearable && field.value && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-8 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  title="Clear selection"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
