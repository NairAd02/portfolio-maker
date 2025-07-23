"use client";
import { User } from "@supabase/supabase-js";
import React, { createContext } from "react";
import useLoggedUser from "../hooks/use-logged-user";

interface Props {
  loggedUser: User | null;
  loading: boolean;
  error: string | null;
  fethLoggedUser: () => Promise<void>;
}

const defaultProps: Props = {
  loggedUser: null,
  loading: false,
  error: null,
  fethLoggedUser: () => {
    throw new Error("fethLoggedUser no está definido.");
  },
};

export const LoggedUserContext = createContext<Props>(defaultProps);

export function LoggedUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loggedUser, loading, error, fethLoggedUser } = useLoggedUser();

  return (
    <LoggedUserContext.Provider
      value={{
        loggedUser,
        loading,
        error,
        fethLoggedUser,
      }}
    >
      {children}
    </LoggedUserContext.Provider>
  );
}
