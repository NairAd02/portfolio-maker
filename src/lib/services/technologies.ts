"use server"
import { createClient } from "../supabase/server";

export async function getTechnologiesList() {
  const supabase = await createClient();
  const { data: technologies, error } = await supabase
    .from("technology")
    .select("*");
  console.log(technologies);
  return { data: technologies, error };
}
