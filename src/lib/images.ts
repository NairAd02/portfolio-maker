export function generateStorageFilePath(file: File, path: string): string {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${path}/${fileName}`;
  return filePath;
}

export async function urlToFile(
  imageUrl: string,
  fileName?: string
): Promise<File> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Error al obtener la imagen: ${response.status} ${response.statusText}`
      );
    }
    const blob = await response.blob();

    // Extraer el nombre del archivo de la URL
    const urlFileName = imageUrl.split("/").pop() || "image";
    
    // Extraer la extensión del nombre del archivo de la URL
    const urlExtension = urlFileName.includes(".")
      ? urlFileName.split(".").pop()?.toLowerCase()
      : null;

    // Determinar la extensión final
    let fileExtension = urlExtension || "png";
    
    // Si el blob tiene un tipo MIME válido, usar su extensión correspondiente
    if (blob.type && blob.type !== "application/octet-stream") {
      const mimeExtension = blob.type.split("/").pop();
      if (mimeExtension) fileExtension = mimeExtension;
    }

    // Crear el nombre del archivo final
    const finalFileName = fileName 
      ? fileName.includes(".")
        ? fileName
        : `${fileName}.${fileExtension}`
      : urlFileName.includes(".")
        ? urlFileName
        : `${urlFileName}.${fileExtension}`;

    const file = new File([blob], finalFileName, {
      type: blob.type || "image/png",
      lastModified: new Date().getTime(),
    });

    return file;
  } catch (error) {
    console.error("Error en urlToFile:", error);
    throw error;
  }
}

interface CompressOptions {
  quality?: number;
  maxWidth?: number;
  format?: "webp" | "jpeg" | "png";
}

export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<File> {
  const { quality = 80, maxWidth = 1920, format = "webp" } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Calcular nuevas dimensiones manteniendo el aspect ratio
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Dibujar la imagen redimensionada
      ctx.drawImage(img, 0, 0, width, height);

      // Convertir a WebP
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Error al comprimir la imagen"));
            return;
          }

          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, "") + ".webp",
            {
              type: `image/webp`,
              lastModified: Date.now(),
            }
          );

          resolve(compressedFile);
        },
        `image/${format}`,
        quality / 100
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Error al cargar la imagen"));
    };

    img.src = url;
  });
}
