import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashBoardLayoutAppSidebar } from "@/sections/dashboard-layout/components/app-sidebar/dashboard-layout-app-sidebar";
import DashBoardLayoutHeader from "@/sections/dashboard-layout/components/header/dashboard-layout-header";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashBoardLayoutAppSidebar />
      <SidebarInset>
        <DashBoardLayoutHeader />
        <div className="container bg-background mx-auto p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
