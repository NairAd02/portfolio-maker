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
import NavigationComponent from "../navigation-component/navigation-component";

interface Action {
  label: string;
  icon?: ReactNode;
  action: () => void;
}

interface Link {
  label: string;
  icon?: ReactNode;
  href: string;
}

interface Props {
  titleTableMenu?: string;
  actions?: Action[];
  links?: Link[];
}

export default function TableMenu({
  titleTableMenu = "Acciones",
  actions = [],
  links = [],
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

        {links.map((link, index) => (
          <NavigationComponent key={index} href={link.href}>
            <DropdownMenuItem className="flex gap-2" key={index}>
              {link.icon && link.icon}
              {link.label}
            </DropdownMenuItem>
          </NavigationComponent>
        ))}

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
