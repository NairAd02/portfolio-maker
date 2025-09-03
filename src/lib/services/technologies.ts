"use server"
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";

export async function getTechnologiesList() {
  const supabase = await createClient();
  const { data: technologies, error } = await supabase
    .from("technology")
    .select("*");
  console.log(technologies);
  return { data: technologies, error };
}

export async function insertProjectTechnologies(
  supabase: SupabaseClient<any, "public", any>,
  projectId: string,
  technologies: string[]
) {
  const technologiesRelations = technologies.map((technology) => ({
    technology_id: technology,
    proyect_id: projectId,
  }));
  const { data, error: technologiesError } = await supabase
    .from("technology_has_proyect")
    .insert(technologiesRelations)
    .select()
    .single();
  if (technologiesError) return { data: null, error: technologiesError };

  return { data, error: null };
}