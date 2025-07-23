"use client";
import { logout } from "@/lib/services/auth";
import { useCallback, useContext, useState } from "react";
import { LoggedUserContext } from "../context/logged-user-context";

interface Props {
  onSignOutAction?: () => void;
}

export default function useSignOut({ onSignOutAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fethLoggedUser } = useContext(LoggedUserContext);
  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await logout();

    if (res.error) {
      console.log(res.error);
      setError("Ocurrió un error durante el cierre de sesión");
    } else {
      fethLoggedUser();
      if (onSignOutAction) onSignOutAction();
    }
  }, [onSignOutAction, fethLoggedUser]);
  return {
    loading,
    error,
    signOut,
  };
}
