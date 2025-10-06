"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { BriefcaseBusiness } from "lucide-react";
import React from "react";

export default function SidebarHeaderContent() {
  const { open } = useSidebar();
  return (
    <div className="flex text-white gap-2 items-center justify-center">
      <BriefcaseBusiness className={` ${open ? "size-8" : "size-8"}`} />
      {open && <p className="text-lg font-bold">Maker Panel</p>}
    </div>
  );
}
