"use client";

import React, { ReactNode } from "react";
import ExitModalButton from "../exit-modal-button/exit-modal-button";

interface Props {
  children: ReactNode;
  modalClassName?: string;
}

export default function ModalLayoutContainer({
  children,
  modalClassName = "max-w-2xl",
}: Props) {
  return (
    <div
      className={`flex flex-col w-full max-h-[98vh] gap-4 bg-background rounded-2xl shadow-xl ${modalClassName}`}
    >
      {/* Botón de cerrar */}
      <div className="flex w-full p-1 bg-primary gap-2 justify-between rounded-t-2xl items-center">
        <p></p>
        <ExitModalButton />
      </div>
      <div className="flex-1 pl-4 pr-2 pb-2 rounded-2xl mr-2 mb-2 overflow-auto">
        {children}
      </div>
    </div>
  );
}
