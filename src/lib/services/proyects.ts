"use server";

import { createClient } from "../supabase/server";

export async function getProyectsList() {
  const supabase = await createClient();
  const { data: proyects, error } = await supabase.from("proyect").select("*");
  console.log(proyects);
  return { data: proyects, error };
}
