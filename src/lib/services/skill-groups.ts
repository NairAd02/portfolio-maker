"use server";

import { createClient } from "../supabase/server";
import { SkillGroup } from "../types/skill-groups";
import { getImageUrlOrThrow } from "./supabase-storage";

export async function getSkillGroupsList() {
  const supabase = await createClient();
  const { data: skillGroupsData, error } = await supabase
    .from("skillgroup")
    .select("*");
  const skillGroups = skillGroupsData as SkillGroup[];

  try {
    const skillGroupsMapped = await Promise.all(
      skillGroups.map(async (skillGroup) => {
        return {
          ...skillGroup,
          icon: skillGroup.icon
            ? await getImageUrlOrThrow(supabase, skillGroup.icon)
            : undefined,
          skills: await Promise.all(
            skillGroup.skills.map(async (skill) => ({
              ...skill,
              icon: skill.icon
                ? await getImageUrlOrThrow(supabase, skill.icon)
                : undefined,
            }))
          ),
        };
      })
    );
    return { data: skillGroupsMapped, error };
  } catch (error) {
    return { data: null, error };
  }
}
