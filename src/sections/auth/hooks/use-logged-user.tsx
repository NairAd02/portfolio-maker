"use client";
import { getLoggedUser as getLoggedUserService } from "@/lib/services/auth";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

export default function useLoggedUser() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fethLoggedUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await getLoggedUserService();
    if (!res.data || res.error) {
      console.log(res.error);
      setLoggedUser(null);
    } else setLoggedUser(res.data.user);

    setLoading(false);
  }, []);

  useEffect(() => {
    fethLoggedUser();
  }, [fethLoggedUser]);

  return { loggedUser, loading, error, fethLoggedUser };
}
