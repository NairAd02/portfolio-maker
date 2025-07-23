"use client";
import { useCallback, useState } from "react";
import { signOut as nextAuthSignOut } from "next-auth/react";
interface Props {
  onSignOutAction?: () => void;
}

export default function useSignOut({ onSignOutAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await nextAuthSignOut({ redirect: false });
      if (onSignOutAction) onSignOutAction();
    } catch (error) {
      console.log(error);
      setError("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  }, [onSignOutAction]);
  return {
    loading,
    error,
    signOut,
  };
}
