"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";
import {
  SkillGroup,
  SkillGroupCreateDTO,
  SkillGroupDetails,
  SkillGroupEditDTO,
} from "../types/skill-groups";
import { getLoggedUser } from "./auth";
import { getImageUrlOrThrow, uploadFileToSupabase } from "./supabase-storage";
import { generateStorageFilePath } from "../images";
import { StorageError } from "@supabase/storage-js";

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

export async function createSkillGroup(
  skillGroupCreateDTO: SkillGroupCreateDTO,
  formData: FormData
) {
  const supabase = await createClient();

  // get the session
  const { data: sessionData, error: loggedUserError } = await getLoggedUser();

  if (!sessionData || loggedUserError) return { data: null, loggedUserError };

  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select("id")
    .eq("user_id", sessionData.user.id)
    .single();

  if (portfolioError) return { data: null, error: portfolioError };

  // insert the skill group icon
  const { data: iconUploadData, error: iconUploadError } =
    await insertSkillGroupIcon(supabase, formData, skillGroupCreateDTO.name);

  if (iconUploadError) return { data: null, error: iconUploadError };

  // insert the skills icons
  const { data: skillIconsData, error: insertSkillIconsError } =
    await insertSkillIcons(supabase, formData, skillGroupCreateDTO.name);

  if (insertSkillIconsError)
    return { data: null, error: insertSkillIconsError };

  const { data: createSkillGroupData, error: createSkillGroupError } =
    await supabase
      .from("skillgroup")
      .insert({
        ...skillGroupCreateDTO,
        icon: iconUploadData,
        skills: skillGroupCreateDTO.skills.map((skill) => {
          // find the icon skill
          const skillIcon = skill.icon
            ? skillIconsData.find((skillIcon) => skillIcon.id === skill.icon)
            : undefined;

          return {
            ...skill,
            icon: skillIcon ? skillIcon.path : undefined,
          };
        }),
        portfolio_id: portfolio.id,
      })
      .select()
      .single();

  if (createSkillGroupError)
    return { data: null, error: createSkillGroupError };

  return { data: createSkillGroupData, error: null };
}

export async function editSkillGroup(
  id: string,
  skillGroupEditDTO: SkillGroupEditDTO,
  formData: FormData
) {
  const supabase = await createClient();

  // find the technology to edit
  const { data: skillGroupFind, error: skillGroupFindError } = await supabase
    .from("skillgroup")
    .select("*")
    .eq("id", id)
    .single();

  if (skillGroupFindError) return { data: null, error: skillGroupFindError };

  const skillGroupEntity = skillGroupFind as SkillGroupDetails;

  // delete the skill group icon
  if (skillGroupEntity.icon)
    await supabase.storage
      .from("portfolio-maker")
      .remove([skillGroupEntity.icon]);

  // delete the skills icons
  if (skillGroupEntity.skills && skillGroupEntity.skills.length > 0)
    await Promise.all(
      skillGroupEntity.skills.map(async (skill) => {
        if (skill.icon)
          await supabase.storage.from("portfolio-maker").remove([skill.icon]);
      })
    );

  // insert the skill group icon
  const { data: iconUploadData, error: iconUploadError } =
    await insertSkillGroupIcon(supabase, formData, skillGroupEditDTO.name);

  if (iconUploadError) return { data: null, error: iconUploadError };

  // insert the skills icons
  const { data: skillIconsData, error: insertSkillIconsError } =
    await insertSkillIcons(supabase, formData, skillGroupEditDTO.name);

  if (insertSkillIconsError)
    return { data: null, error: insertSkillIconsError };

  const { data: updateSkillGroupData, error: updateSkillGroupError } =
    await supabase
      .from("skillgroup")
      .update({
        ...skillGroupEditDTO,
        icon: iconUploadData,
        skills: skillGroupEditDTO.skills.map((skill) => {
          // find the icon skill
          const skillIcon = skill.icon
            ? skillIconsData.find((skillIcon) => skillIcon.id === skill.icon)
            : undefined;
          return {
            ...skill,
            icon: skillIcon ? skillIcon.path : undefined,
          };
        }),
      })
      .eq("id", id)
      .select()
      .single();

  if (updateSkillGroupError)
    return { data: null, error: updateSkillGroupError };

  return { data: updateSkillGroupData, error: null };
}

// aux functions
async function insertSkillGroupIcon(
  supabase: SupabaseClient<any, "public", any>,
  formData: FormData,
  skillGroupName: string
) {
  const icon = formData.get("icon") as File;
  if (!icon) return { data: null, error: null };

  const iconPath = generateStorageFilePath(
    icon,
    `skill-groups/${skillGroupName}/icon`
  );

  const uploadIconError = await uploadFileToSupabase(
    supabase,
    "portfolio-maker",
    iconPath,
    icon,
    "3600",
    false
  );
  if (uploadIconError) return { data: null, error: uploadIconError };

  return { data: iconPath, error: null };
}

async function insertSkillIcons(
  supabase: SupabaseClient<any, "public", any>,
  formData: FormData,
  skillGroupName: string
) {
  const skillIcons = formData.getAll("skillIcons[]") as File[];
  let skillIconsPath: { id: string; path: string }[] = [];
  if (skillIcons && skillIcons.length > 0) {
    try {
      skillIconsPath = await Promise.all(
        skillIcons.map(async (skillIcon) => {
          const skillIconPath = generateStorageFilePath(
            skillIcon,
            `projects/${skillGroupName}/skillIcons`
          );
          const uploadError = await uploadFileToSupabase(
            supabase,
            "portfolio-maker",
            skillIconPath,
            skillIcon,
            "3600",
            false
          );
          if (uploadError) throw uploadError;
          return { id: skillIcon.name, path: skillIconPath };
        })
      );
    } catch (error) {
      return { data: null, error: error as StorageError };
    }
  }
  return { data: skillIconsPath };
}
