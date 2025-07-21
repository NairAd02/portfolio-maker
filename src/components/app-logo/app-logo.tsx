import React from "react";
import NavigationComponent from "../navigation-component/navigation-component";
import { paths } from "@/routes/path";

export default function AppLogo() {
  return (
    <NavigationComponent href={paths.landing.root}>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/70 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">PM</span>
        </div>
        <span className="text-xl hidden sm:flex font-bold text-primary">
          PortfolioMaker
        </span>
      </div>
    </NavigationComponent>
  );
}
