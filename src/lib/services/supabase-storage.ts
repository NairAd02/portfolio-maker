import { SupabaseClient } from "@supabase/supabase-js";

export async function getImageUrlOrThrow(
  supabase: SupabaseClient<any, "public", any>,
  path: string
) {
  const { data, error } = await getSignedImageUrl(supabase, path);
  if (error) throw error;
  return data.signedUrl;
}

// Caché de imágenes
const imageCache = new Map();

export async function getSignedImageUrl(
  supabase: SupabaseClient<any, "public", any>,
  path: string,
  seconds: number = 3600
) {
  const cacheKey = `${path}-${seconds}`;

  const cached = imageCache.get(cacheKey);
  if (cached && Date.now() < cached.expires) {
    return { data: cached.data, error: null };
  }

  const { data, error } = await supabase.storage
    .from("portfolio-maker")
    .createSignedUrl(path, seconds);

  if (error) return { data: null, error };

  imageCache.set(cacheKey, {
    data,
    expires: Date.now() + seconds * 1000 * 0.8, // 80% del tiempo original
  });

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
