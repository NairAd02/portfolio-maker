"use client"
import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  cancelButtonText?: string;
  submitButtonText?: string;
  submitLoading: boolean;
  handleClose: () => void;
}

export default function FormActionButtons({
  cancelButtonText = "Cancelar",
  submitButtonText = "subir información",
  submitLoading,
  handleClose,
}: Props) {
  return (
    <div className="flex gap-2 justify-end">
      <Button type="button" variant={"outline"} onClick={handleClose}>
        {cancelButtonText}
      </Button>
      <Button variant={"default"} type="submit" disabled={submitLoading}>
        {submitButtonText}
      </Button>
    </div>
  );
}
