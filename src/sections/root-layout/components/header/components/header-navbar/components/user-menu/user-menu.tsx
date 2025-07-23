"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import SignOutButton from "./components/sign-out-button/sign-out-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback } from "react";

import useLoggedUser from "@/sections/auth/hooks/use-logged-user";

export default function UserMenu() {
  const { loggedUser, loading, error } = useLoggedUser();

  const handleOpenProfileModal = useCallback(() => {}, []);

  if (loading) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  if (!loggedUser || error) {
    return (
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-destructive text-destructive-foreground border border-destructive text-xs font-semibold">
        Error
      </div>
    );
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {loggedUser.email
                ? loggedUser.email
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "?"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {loggedUser.email
                  ? loggedUser.email
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {loggedUser.email || "Desconocido"}
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-start h-9 px-3"
            onClick={handleOpenProfileModal}
          >
            <User className="mr-3 h-4 w-4" />
            Ver perfil
          </Button>
        </div>
        <Separator />
        <div className="p-2">
          <SignOutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
