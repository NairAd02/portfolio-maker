import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashBoardLayoutAppSidebar } from "@/sections/dashboard-layout/components/app-sidebar/dashboard-layout-app-sidebar";
import DashBoardLayoutHeader from "@/sections/dashboard-layout/components/header/dashboard-layout-header";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { paths } from "@/routes/path";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect(paths.sign_in.root);
  }
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
