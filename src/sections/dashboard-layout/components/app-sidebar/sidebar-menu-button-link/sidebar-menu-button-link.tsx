"use client";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  path: string;
}

export default function SideBarMenuButtonLink({ title, icon, path }: Props) {
  const currentPath = usePathname();
  const isActive = currentPath === path;
  return (
    <Link className="flex gap-2 w-full" href={path}>
      <SidebarMenuButton className="text-[15px]" tooltip={title} isActive={isActive}>
        {icon && icon}
        <span>{title}</span>
      </SidebarMenuButton>
    </Link>
  );
}
