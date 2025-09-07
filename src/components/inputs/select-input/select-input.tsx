"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XIcon } from "lucide-react";
import React from "react";

interface Props {
  label?: string;
  placeHolder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string }[];
  loading?: boolean;
  clearable?: {
    handleClear: () => void;
  };
  fullWidth?: boolean;
}

export default function SelectInput({
  label,
  placeHolder = "Seleccione elemento",
  value,
  onValueChange,
  options,
  loading = false,
  clearable,
  fullWidth = true,
}: Props) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Select
          value={value || ""}
          onValueChange={onValueChange}
          disabled={loading}
        >
          <SelectTrigger className={`${fullWidth ? "w-full" : ""}`}>
            <SelectValue placeholder={loading ? "Cargando..." : placeHolder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {clearable && value && (
          <button
            type="button"
            onClick={clearable.handleClear}
            className="absolute right-8 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            title="Clear selection"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
