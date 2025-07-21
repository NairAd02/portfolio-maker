"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./footer";

export default function FooterRendering() {
  const pathname = usePathname();
  return !pathname.includes("dashboard") && <Footer />;
}
