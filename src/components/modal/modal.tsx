"use client";
import { ReactNode, useContext } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ModalContext } from "./context/modalContext";
import { Box, XIcon } from "lucide-react";

interface Props {
  formPath: string;
  title?: string;
  icon?: ReactNode;
  titleCenter?: boolean;
  titleSize?: "small" | "medium" | "big";
  children: ReactNode;
  wide?: "small" | "normal" | "large";
  maxWidth?: string;
  className?: string;
}

export default function Modal({
  formPath,
  title,
  icon,
  titleSize = "medium",
  titleCenter = false,
  children,
  wide = "normal",
  maxWidth,
  className,
}: Props) {
  const { onOpenChange, isModalOpen } = useContext(ModalContext);
  return (
    <Dialog
      open={isModalOpen(formPath)}
      onOpenChange={(_state: boolean) => onOpenChange(formPath)}
    >
      <DialogContent
        className={`w-full max-h-screen flex flex-col  ${
          !maxWidth
            ? wide === "normal"
              ? "sm:max-w-lg"
              : wide === "large"
              ? "max-w-[1400px]"
              : "max-w-md"
            : maxWidth
        } ${className && className}`}
      >
        <DialogHeader className="bg-primary flex gap-2 justify-between p-2 rounded-t-lg text-white">
          <DialogTitle
            className={`flex gap-3 ${
              titleCenter ? "justify-center" : "justify-start"
            } ${
              titleSize === "medium"
                ? "text-md"
                : titleSize === "big"
                ? "text-2xl"
                : "text-sm"
            }`}
          >
            {icon || <Box />}
            {title || ""}
          </DialogTitle>
          <DialogClose>
            <XIcon className="w-4 h-4 cursor-pointer hover:text-destructive" />
          </DialogClose>
        </DialogHeader>
        <div className="flex-1 overflow-auto flex flex-col h-full p-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
