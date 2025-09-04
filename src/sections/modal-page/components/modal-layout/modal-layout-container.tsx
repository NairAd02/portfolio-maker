"use client";

import React, { ReactNode } from "react";
import ExitModalButton from "../exit-modal-button/exit-modal-button";

interface Props {
  children: ReactNode;
}

export default function ModalLayoutContainer({ children }: Props) {
  const maxWidth = "max-w-2xl";

  return (
    <div
      className={`flex flex-col w-full max-h-[100vh] ${maxWidth} gap-4 bg-muted p-4 rounded-2xl shadow-xl`}
    >
      {/* Botón de cerrar */}
      <div className="flex w-full gap-2 justify-between items-center">
        <p></p>
        <ExitModalButton />
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
