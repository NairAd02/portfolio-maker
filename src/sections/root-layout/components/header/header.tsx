import React from "react";
import HeaderNavbar from "./components/header-navbar/header-navbar";
import AppLogo from "@/components/app-logo/app-logo";

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <AppLogo />
        <HeaderNavbar />
      </div>
    </header>
  );
}
