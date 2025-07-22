"use server";

import { createClient } from "../supabase/server";

export async function getProjectsList() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase.from("project").select("*");
  console.log(projects);
  return { data: projects, error };
}
