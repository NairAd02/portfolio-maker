import { SupabaseClient } from "@supabase/supabase-js";

export function getPublicImageUrl(
  supabase: SupabaseClient<any, "public", any>,
  path: string | undefined
) {
  if (!path) return undefined;
  return supabase.storage.from("portfolio-maker").getPublicUrl(path).data
    .publicUrl;
}

export async function uploadFileToSupabase(
  supabase: SupabaseClient<any, "public", any>,
  bucket: string,
  path: string,
  file: File,
  cacheControl: string = "3600",
  upsert: boolean = false
) {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl,
    upsert,
  });
  return error;
}
