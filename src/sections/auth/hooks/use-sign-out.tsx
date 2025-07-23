"use client";
import { logout } from "@/lib/services/auth";
import { useCallback, useState } from "react";

interface Props {
  onSignOutAction?: () => void;
}

export default function useSignOut({ onSignOutAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await logout();

    if (res.error) {
      console.log(res.error);
      setError("Ocurrió un error durante el cierre de sesión");
    } else if (onSignOutAction) onSignOutAction();
  }, [onSignOutAction]);
  return {
    loading,
    error,
    signOut,
  };
}
