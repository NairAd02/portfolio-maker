"use client";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import {
  X,
  Upload,
  FileIcon,
  ImageIcon,
  Loader2,
  File as FileIcon2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { compressImage } from "@/lib/images";

interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

interface MultiFileUploadProps {
  name: string;
  label?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  className?: string;
  error?: string;
  loading?: boolean;
  quality?: number;
  maxWidth?: number;
  acceptedFileTypes?: Record<string, string[]>;
  compressImages?: boolean;
}

export function RHFMultiFileUpload({
  name,
  label = "Subir archivos",
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 5,
  className,
  error,
  loading = false,
  quality = 80,
  maxWidth = 1920,
  acceptedFileTypes = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    "application/pdf": [".pdf"],
    "text/*": [".txt", ".csv"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
  },
  compressImages = true,
}: MultiFileUploadProps) {
  const { setValue, watch, formState } = useFormContext();
  const value: FileWithPreview[] = watch(name);
  const fieldError = error || formState.errors[name]?.message;

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingFiles, setProcessingFiles] = useState<Set<string>>(
    new Set()
  );

  // Estado local para previews
  const [previews, setPreviews] = useState<{ [id: string]: string }>({});

  // Generar previews cuando cambia value
  useEffect(() => {
    if (!value || !Array.isArray(value)) {
      setPreviews({});
      return;
    }
    const newPreviews: { [id: string]: string } = {};
    value.forEach((file) => {
      if (file.type && file.type.startsWith("image/") && file instanceof File) {
        newPreviews[file.name] = URL.createObjectURL(file);
      }
    });
    setPreviews(newPreviews);
    // Limpiar las URLs cuando cambie value o al desmontar
    return () => {
      Object.values(newPreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [value]);

  const processFile = useCallback(
    async (file: File): Promise<FileWithPreview> => {
      const fileId = `${file.name}-${Date.now()}-${Math.random()}`;

      // Si es una imagen y está habilitada la compresión
      if (file.type.startsWith("image/") && compressImages) {
        try {
          const compressedFile = await compressImage(file, {
            quality,
            maxWidth,
            format: "webp",
          });

          // Cambiar el nombre del archivo a .webp
          const originalName =
            file.name.split(".").slice(0, -1).join(".") || file.name;
          const webpName = originalName + ".webp";
          const processedFile = new File([compressedFile], webpName, {
            type: compressedFile.type,
          }) as FileWithPreview;

          processedFile.id = fileId;

          // Crear preview para imágenes
          processedFile.preview = URL.createObjectURL(processedFile);

          return processedFile;
        } catch (err) {
          console.error("Error compressing image:", err);
        }
      }

      // Para archivos no imagen o si falla la compresión
      const fileWithPreview = file as FileWithPreview;
      fileWithPreview.id = fileId;

      // Crear preview solo para imágenes
      if (file.type.startsWith("image/")) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }

      return fileWithPreview;
    },
    [quality, maxWidth, compressImages]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: acceptedFileTypes,
      maxSize,
      multiple: true,
      disabled: loading || isProcessing,
      onDrop: async (acceptedFiles) => {
        if (acceptedFiles?.length) {
          // Verificar que no exceda el máximo de archivos
          const totalFiles = value.length + acceptedFiles.length;
          if (totalFiles > maxFiles) {
            return;
          }

          setIsProcessing(true);

          try {
            const processedFiles: FileWithPreview[] = [];

            for (const file of acceptedFiles) {
              setProcessingFiles((prev) => new Set(prev).add(file.name));
              const processedFile = await processFile(file);
              processedFiles.push(processedFile);
              setProcessingFiles((prev) => {
                const newSet = new Set(prev);
                newSet.delete(file.name);
                return newSet;
              });
            }

            setValue(name, [...value, ...processedFiles], {
              shouldValidate: true,
            });
          } catch (err) {
            console.error("Error processing files:", err);
          } finally {
            setIsProcessing(false);
          }
        }
      },
    });

  // Limpiar URLs de preview cuando el componente se desmonte
  useEffect(() => {
    return () => {
      value.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [value]);

  // Manejar eliminación de archivo individual
  const handleRemoveFile = (fileId: string) => {
    if (loading || isProcessing) return;

    const fileToRemove = value.find((f) => f.name === fileId);
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    const updatedFiles = value.filter((file) => file.name !== fileId);
    setValue(name, updatedFiles, { shouldValidate: true });
  };

  // Limpiar todos los archivos
  const handleClearAll = () => {
    if (loading || isProcessing) return;

    value.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });

    setValue(name, [], { shouldValidate: true });
  };

  // Obtener icono según el tipo de archivo
  const getFileIcon = (file: FileWithPreview) => {
    if (file.type.startsWith("image/")) {
      // Mostrar preview si existe
      if (previews[file.name]) {
        return (
          <div className="relative w-12 h-12 rounded overflow-hidden">
            <Image
              src={previews[file.name] || "/placeholder.svg"}
              alt={file.name}
              fill
              className="object-cover"
            />
          </div>
        );
      }
      return <ImageIcon className="h-8 w-8 text-blue-500" />;
    }
    if (file.type === "application/pdf") {
      return <FileIcon className="h-8 w-8 text-red-500" />;
    }
    return <FileIcon2 className="h-8 w-8 text-gray-500" />;
  };

  // Formatear tamaño de archivo
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  // Obtener errores de rechazo de archivos
  const fileRejectionError = fileRejections[0]?.errors[0]?.message;
  const maxFilesError =
    value.length >= maxFiles ? `Máximo ${maxFiles} archivos permitidos` : null;

  return (
    <div className={cn("space-y-4", className)}>
      {label && <p className="text-sm font-medium">{label}</p>}

      {/* Área de drop */}
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900/30",
          "h-32",
          (fieldError || fileRejectionError || maxFilesError) &&
            "border-red-500",
          loading || isProcessing ? "cursor-wait opacity-70" : "cursor-pointer",
          value.length >= maxFiles && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          {...getInputProps()}
          disabled={loading || isProcessing || value.length >= maxFiles}
        />

        {(loading || isProcessing) && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">
                Procesando archivos...
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          {isDragActive ? (
            <>
              <Upload className="w-8 h-8 text-primary" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Suelta los archivos aquí
              </p>
            </>
          ) : (
            <>
              <Upload
                className={cn(
                  "w-8 h-8 text-gray-400",
                  (loading || isProcessing) && "opacity-50"
                )}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {value.length >= maxFiles
                  ? `Máximo ${maxFiles} archivos alcanzado`
                  : "Arrastra y suelta archivos, o haz clic para seleccionar"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Hasta {Math.round(maxSize / (1024 * 1024))}MB por archivo •{" "}
                {maxFiles - value.length} restantes
              </p>
            </>
          )}
        </div>
      </div>

      {/* Lista de archivos subidos */}
      {value.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Archivos subidos ({value.length}/{maxFiles})
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              disabled={loading || isProcessing}
            >
              Limpiar todo
            </Button>
          </div>

          <div className="grid gap-3 max-h-64 overflow-y-auto">
            {value.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900/30"
              >
                {/* Preview o icono */}
                <div className="flex-shrink-0">{getFileIcon(file)}</div>

                {/* Información del archivo */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)} • {file.type}
                  </p>
                  {processingFiles.has(file.name) && (
                    <p className="text-xs text-blue-500 flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Procesando...
                    </p>
                  )}
                </div>

                {/* Botón eliminar */}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveFile(file.name)}
                  disabled={loading || isProcessing}
                  className="flex-shrink-0 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Errores */}
      {(fieldError || fileRejectionError || maxFilesError) && (
        <p className="text-sm text-red-500">
          {typeof fieldError === "string"
            ? fieldError
            : fileRejectionError || maxFilesError}
        </p>
      )}
    </div>
  );
}
