import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Save } from "lucide-react";
import React from "react";

interface Props {
  text?: string;
  submitLoading: boolean;
}

export default function SubmitButton({
  text = "Enviar",
  submitLoading,
}: Props) {
  return (
    <Button className="flex gap-2" disabled={submitLoading}>
      {submitLoading ? <LoadingSpinner /> : <Save className="w-4 h-4" />}
      {text}
    </Button>
  );
}
