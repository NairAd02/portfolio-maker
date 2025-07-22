"use client";
import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./button";

interface Action {
  label: string;
  icon?: ReactNode;
  action: () => void;
}

interface Props {
  titleTableMenu?: string;
  actions: Action[];
}

export default function TableMenu({
  titleTableMenu = "Acciones",
  actions,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{titleTableMenu}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {actions.map((action, index) => (
          <DropdownMenuItem
            className="flex gap-2"
            key={index}
            onClick={action.action}
          >
            {action.icon && action.icon}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
