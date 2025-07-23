"use client";
import { useCallback, useState } from "react";
import { sendVerificationCode as sendVerificationCodeService } from "@/lib/services/auth";

interface Props {
  userId: string;
  onSendVerificationCodeAction: () => void;
}

export default function useSendVerificationCode({
  userId,
  onSendVerificationCodeAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendVerificationCode = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await sendVerificationCodeService(userId);
      if (!res.response || res.error)
        setError(
          res.error?.reason || "Error en el envío del código de verificación"
        );
      else {
        onSendVerificationCodeAction();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [onSendVerificationCodeAction, userId]);
  return {
    loading,
    error,
    sendVerificationCode,
  };
}
