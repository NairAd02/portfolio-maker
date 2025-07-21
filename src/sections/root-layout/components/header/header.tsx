import React from "react";
import HeaderNavbar from "./components/header-navbar/header-navbar";

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PM</span>
          </div>
          <span className="text-xl font-bold text-slate-800">
            PortfolioMaker
          </span>
        </div>
        <HeaderNavbar />
      </div>
    </header>
  );
}
