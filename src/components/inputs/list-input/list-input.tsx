"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";

interface Props {
  id: string;
  label?: string;
  values: string[];
  options: { value: string; label: string }[];
  handleValuesChange: (value: string, checked: boolean) => void;
  loading?: boolean;
}

export default function ListInput({
  id,
  label,
  values,
  options,
  handleValuesChange,
  loading = false,
}: Props) {
  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : options.length === 0 ? (
        <p className="text-sm text-gray-500">No hay opciones disponibles</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`${id}-${option.value}`}
                checked={values.includes(option.value) || false}
                onCheckedChange={(checked) => {
                  handleValuesChange(option.value, checked as boolean);
                }}
              />
              <Label
                htmlFor={`${id}-${option.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
