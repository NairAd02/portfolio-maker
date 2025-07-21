"use client";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import type { PropsWithChildren } from "react";

export default function ProgressBar({ children }: PropsWithChildren) {
  return (
    <ProgressProvider
      height="4px"
      color="#005f73"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
