import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

let client: ReturnType<typeof createServerClient> | null = null;

export async function createClient() {
  if (client) return client;

  const cookieStore = await cookies();
  client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
  return client;
}
