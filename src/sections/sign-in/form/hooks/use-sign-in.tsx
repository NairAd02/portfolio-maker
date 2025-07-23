"use client";
import { useCallback, useContext, useState } from "react";
import { Credentials } from "../schemas/credentials-schema";
import { login } from "@/lib/services/auth";
import { LoggedUserContext } from "@/sections/auth/context/logged-user-context";

interface Props {
  onSignInAction: () => void;
}

export default function useSignIn({ onSignInAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fethLoggedUser } = useContext(LoggedUserContext);
  const signIn = useCallback(
    async (credentials: Credentials) => {
      try {
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append("email", credentials.firstCredential);
        formData.append("password", credentials.password);
        const res = await login(formData);
        if (res.error)
          setError("Las credenciales proporcionadas no son correctas");
        else {
          fethLoggedUser();
          onSignInAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onSignInAction, fethLoggedUser]
  );
  return {
    loading,
    error,
    signIn,
  };
}
