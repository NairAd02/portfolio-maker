"use client";
import { Button } from "@/components/ui/button";
import { paths } from "@/routes/path";
import useSignOut from "@/sections/auth/hooks/use-sign-out";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const { signOut, loading } = useSignOut({
    onSignOutAction: () => {
      router.push(paths.landing.root);
    },
  });

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Button
      variant="ghost"
      disabled={loading}
      className="w-full justify-start h-9 px-3 text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
      onClick={handleSignOut}
    >
      <LogOutIcon className="mr-3 h-4 w-4" />
      Cerrar sesión
    </Button>
  );
}
