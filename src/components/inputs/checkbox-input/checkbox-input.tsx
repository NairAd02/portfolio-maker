"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckedState } from "@radix-ui/react-checkbox";
import React from "react";

interface Props {
  id: string;
  label?: string;
  description?: string;
  value?: boolean;
  onCheckedChange?: (checked: CheckedState) => void;
}

export default function CheckboxInput({
  id,
  label,
  description,
  value,
  onCheckedChange,
}: Props) {
  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          checked={value === true}
          onCheckedChange={onCheckedChange}
        />
        {description && (
          <Label htmlFor={id} className="text-sm font-normal">
            {description}
          </Label>
        )}
      </div>
    </div>
  );
}
