"use client";
import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { X, Upload, FileText, Loader2, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  name: string;
  label?: string;
  maxSize?: number; // in bytes
  className?: string;
  error?: string;
  loading?: boolean;
  acceptedFormats?: string[]; // e.g., ['.pdf', '.doc', '.docx']
  withAdditionalInfo?: boolean;
}

export function RHFFileUpload({
  name,
  label,
  maxSize = 10 * 1024 * 1024, // 10MB default
  className,
  error,
  loading = false,
  acceptedFormats = [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
  ],
  withAdditionalInfo = true,
}: FileUploadProps) {
  const { setValue, watch, formState } = useFormContext();
  const value = watch(name);
  const fieldError = error || formState.errors[name]?.message;
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: string;
  } | null>(null);

  // Format file size
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }, []);

  // Create accept object for dropzone
  const acceptObject = acceptedFormats.reduce((acc, format) => {
    const mimeTypes: { [key: string]: string[] } = {
      ".pdf": ["application/pdf"],
      ".doc": ["application/msword"],
      ".docx": [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      ".txt": ["text/plain"],
      ".xls": ["application/vnd.ms-excel"],
      ".xlsx": [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
      ".ppt": ["application/vnd.ms-powerpoint"],
      ".pptx": [
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ],
    };

    const mimeType = mimeTypes[format];
    if (mimeType) {
      mimeType.forEach((mime) => {
        if (!acc[mime]) {
          acc[mime] = [];
        }
        acc[mime].push(format);
      });
    }
    return acc;
  }, {} as { [key: string]: string[] });

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: acceptObject,
      maxSize,
      multiple: false,
      disabled: loading,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles?.length) {
          const file = acceptedFiles[0];
          setValue(name, file, { shouldValidate: true });
        }
      },
    });

  // Update file info when file changes
  useEffect(() => {
    if (!value) {
      setFileInfo(null);
      return;
    }
    setFileInfo({
      name: value.name,
      size: formatFileSize(value.size),
    });
  }, [value, formatFileSize]);

  // Handle file removal
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;
    setValue(name, undefined, { shouldValidate: true });
    setFileInfo(null);
  };

  // Get file rejection errors
  const fileRejectionError = fileRejections[0]?.errors[0]?.message;

  // Get file extension icon color
  const getFileIconColor = (fileName: string): string => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return "text-red-500";
      case "doc":
      case "docx":
        return "text-blue-500";
      case "xls":
      case "xlsx":
        return "text-green-500";
      case "ppt":
      case "pptx":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

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
          fileInfo ? "h-auto min-h-[120px]" : "h-40",
          fieldError && "border-red-500",
          loading ? "cursor-wait opacity-70" : "cursor-pointer",
          loading && !fileInfo && "animate-pulse"
        )}
      >
        <input {...getInputProps()} disabled={loading} />

        {loading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-foreground">Procesando archivo...</p>
            </div>
          </div>
        )}

        {fileInfo ? (
          <div className="w-full">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-md">
              <div className="flex-shrink-0">
                <FileText
                  className={cn("w-10 h-10", getFileIconColor(fileInfo.name))}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {fileInfo.name}
                </p>
                <p className="text-xs text-muted-foreground">{fileInfo.size}</p>
              </div>
              <Button
                type="button"
                onClick={handleRemove}
                variant="destructive"
                size="sm"
                className="flex-shrink-0 h-8 w-8 p-0 rounded-full"
                disabled={loading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {withAdditionalInfo && (
              <p className="text-xs text-center text-muted-foreground mt-3">
                Haz clic o arrastra para reemplazar el archivo
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            {isDragActive ? (
              <>
                <File className="w-10 h-10 text-primary" />
                <p className="text-sm text-foreground dark:text-foreground">
                  Suelta el archivo aquí
                </p>
              </>
            ) : (
              <>
                <Upload
                  className={cn(
                    "w-10 h-10 text-primary",
                    loading && "opacity-50"
                  )}
                />
                <p className="text-sm text-foreground dark:text-secondary">
                  {loading
                    ? "Espera mientras se procesa el archivo..."
                    : "Arrastra y suelta un archivo, o haz clic para seleccionar"}
                </p>
                {withAdditionalInfo && (
                  <p className="text-xs text-foreground dark:text-foreground">
                    {acceptedFormats.join(", ").toUpperCase()} hasta{" "}
                    {Math.round(maxSize / (1024 * 1024))}MB
                  </p>
                )}
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
