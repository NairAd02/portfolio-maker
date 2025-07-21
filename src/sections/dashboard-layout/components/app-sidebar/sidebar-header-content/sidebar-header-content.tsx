"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Building2 } from "lucide-react";
import React from "react";

export default function SidebarHeaderContent() {
  const { open } = useSidebar();
  return (
    <div className="flex text-white flex-col gap-4 items-center justify-center">
      <Building2 className={` ${open ? "size-12" : "size-8"}`} />

      {open && <p className="text-lg font-bold">Admin Panel</p>}
    </div>
  );
}
