"use client";
import React from "react";
import { Label } from "../../ui/label";
import { Search } from "lucide-react";
import { Textarea } from "../../ui/textarea";

interface Props {
  id: string;
  label?: string;
  placeHolder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export default function TextareaInput({
  id,
  label,
  placeHolder = "Escribe tu texto aquí...",
  value,
  onChange,
  rows = 4,
}: Props) {
  return (
    <div className="space-y-2 w-full">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Textarea
          id={id}
          placeholder={placeHolder}
          value={value || ""}
          onChange={onChange}
          rows={rows}
          className="pl-10 min-h-[80px] resize-y"
        />
      </div>
    </div>
  );
}
