export function generateStorageFilePath(file: File, path: string): string {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${path}/${fileName}`;
  return filePath;
}
