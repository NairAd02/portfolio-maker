"use client";
import React from "react";
import { Label } from "../../ui/label";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";

interface Props {
  id: string;
  label?: string;
  placeHolder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  id,
  label,
  placeHolder = "Introduzca valor a buscar",
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-2 w-full">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id={id}
          placeholder={placeHolder}
          value={value || ""}
          onChange={onChange}
          className="pl-10"
        />
      </div>
    </div>
  );
}
