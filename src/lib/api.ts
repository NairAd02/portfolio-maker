import { ApiError, ApiResponse } from "./types/api";


export function formatErrorMessage(err: ApiError): string {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export const isObject = (object: unknown): object is Record<string, unknown> =>
  typeof object === "object" && object !== null && !Array.isArray(object);

export const isApiError = (error: unknown): error is ApiError => {
  if (error instanceof ApiError) return true;

  return false;
};

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const buildApiResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  console.log(
    "buildApiResponse called with response:",
    response.status,
    response.statusText,
    response.url
  );
  if (response.ok) {
    return {
      response: (await response.json()) as T,
      status: 200,
    };
  } else {
    if (response.status === 401)
      return {
        error: {
          name: "Unauthorized",
          reason: "No está autorizado para usar este recurso",
          code: "401",
        },
        status: 401,
      };
    else if (response.status === 400) {
      const error = await response.json();
      return {
        error: {
          name: "bad request",
          reason: error.message,
          code: "400",
        },
        status: 400,
      };
    }
  }

  return {
    error: {
      name: "Internal Server Error",
      reason: "Ocurrió un error inesperado",
      code: response.status.toString(),
    },
    status: response.status,
  };
};

export const getErrorMessage = (error: unknown) => {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  if (error instanceof ApiError) return error.detail;
  return error;
};

export function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function filesToBase64(files: File[]): Promise<string[]> {
  return Promise.all(
    files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    })
  );
}
