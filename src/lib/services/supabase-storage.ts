import { SupabaseClient } from "@supabase/supabase-js";

export async function getImageUrlOrThrow(
  supabase: SupabaseClient<any, "public", any>,
  path: string
) {
  const { data, error } = await getSignedImageUrl(supabase, path);
  if (error) throw error;
  return data.signedUrl;
}

export async function getSignedImageUrl(
  supabase: SupabaseClient<any, "public", any>,
  path: string,
  seconds: number = 60
) {
  const { data, error } = await supabase.storage
    .from("portfolio-maker")
    .createSignedUrl(path, seconds);
  if (error) return { data: null, error };
  return { data, error: null };
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
