"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { X, Upload, ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { compressImage } from "@/lib/images";

interface ImageUploadProps {
  name: string;
  label?: string;
  maxSize?: number; // in bytes
  className?: string;
  error?: string;
  loading?: boolean;
  quality?: number;
  maxWidth?: number;
}

export function RHFImageUpload({
  name,
  label = "Subir imagen",
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
  error,
  loading = false,
  quality = 80,
  maxWidth = 1920,
}: ImageUploadProps) {
  const { setValue, watch, formState } = useFormContext();
  const value = watch(name);
  const fieldError = error || formState.errors[name]?.message;

  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      try {
        const compressedFile = await compressImage(file, {
          quality,
          maxWidth,
          format: "webp",
        });

        setValue(name, compressedFile, { shouldValidate: true });
      } catch (err) {
        console.error("Error processing image:", err);
        setValue(name, file, { shouldValidate: true });
      } finally {
        setIsProcessing(false);
      }
    },
    [name, setValue, quality, maxWidth]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
      },
      maxSize,
      multiple: false,
      disabled: loading || isProcessing,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles?.length) {
          const file = acceptedFiles[0];
          processImage(file);
        }
      },
    });

  // Create preview when file changes
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    // Free memory when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  // Handle file removal
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading || isProcessing) return;
    setValue(name, undefined, { shouldValidate: true });
    setPreview(null);
  };

  // Get file rejection errors
  const fileRejectionError = fileRejections[0]?.errors[0]?.message;

  return (
    <div className={cn("space-y-2", className)}>
      {label && <p className="text-sm font-medium">{label}</p>}

      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900/30",
          preview ? "h-64" : "h-40",
          error && "border-red-500",
          loading || isProcessing ? "cursor-wait opacity-70" : "cursor-pointer",
          (loading || isProcessing) && !preview && "animate-pulse"
        )}
      >
        <input {...getInputProps()} disabled={loading || isProcessing} />

        {(loading || isProcessing) && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">
                {isProcessing
                  ? "Optimizando imagen..."
                  : "Procesando imagen..."}
              </p>
            </div>
          </div>
        )}

        {preview ? (
          <>
            <Image
              src={preview || "/place-holder.jpg"}
              alt="Vista previa"
              width={1920}
              height={1080}
              className={cn(
                "object-contain w-full h-full rounded-md",
                (loading || isProcessing) && "filter blur-[1px]"
              )}
            />
            <Button
              type="button"
              onClick={handleRemove}
              variant={"destructive"}
              className="absolute top-2 right-2 p-1 rounded-full"
              disabled={loading || isProcessing}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            {isDragActive ? (
              <>
                <ImageIcon className="w-10 h-10 text-primary" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Suelta la imagen aquí
                </p>
              </>
            ) : (
              <>
                <Upload
                  className={cn(
                    "w-10 h-10 text-gray-400",
                    (loading || isProcessing) && "opacity-50"
                  )}
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {loading || isProcessing
                    ? "Espera mientras se procesa la imagen..."
                    : "Arrastra y suelta una imagen, o haz clic para seleccionar"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  PNG, JPG, GIF hasta {Math.round(maxSize / (1024 * 1024))}MB
                  (se convertirá a WebP)
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {(fieldError || fileRejectionError) && (
        <p className="text-sm text-red-500">
          {typeof fieldError === "string" ? fieldError : fileRejectionError}
        </p>
      )}
    </div>
  );
}
