"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";
import {
  LevelEnum,
  MasteredTechnology,
  SkillGroup,
  SkillGroupCreateDTO,
  SkillGroupDetails,
  SkillGroupEditDTO,
} from "../types/skill-groups";
import { getLoggedUser } from "./auth";
import { getImageUrlOrThrow, uploadFileToSupabase } from "./supabase-storage";
import { generateStorageFilePath } from "../images";
import { v4 as uuidv4 } from "uuid";
import { Technology } from "../types/technologies";
import { insertSkillGroupsTechnologies } from "./technologies";

export async function getSkillGroupsList() {
  const supabase = await createClient();
  const { data: skillGroupsData, error } = await supabase.from("skillgroup")
    .select(`
      *,
      skillgroup_has_technology (
        technology (*),
        level
      )
    `);

  const skillGroups = skillGroupsData as (SkillGroup & {
    skillgroup_has_technology: { technology: Technology; level: LevelEnum }[];
  })[];

  try {
    const skillGroupsMapped = await Promise.all(
      skillGroups.map(async (skillGroup) => {
        return {
          ...skillGroup,
          icon: skillGroup.icon
            ? await getImageUrlOrThrow(supabase, skillGroup.icon)
            : undefined,
          masteredTechnologies: await Promise.all(
            skillGroup.skillgroup_has_technology.map(
              async (sht) =>
                ({
                  technology: {
                    ...sht.technology,
                    icon: sht.technology.icon
                      ? await getImageUrlOrThrow(supabase, sht.technology.icon)
                      : undefined,
                  },
                  level: sht.level,
                } as MasteredTechnology)
            )
          ),
        };
      })
    );
    return { data: skillGroupsMapped, error };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getSkillGroupById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skillgroup")
    .select(
      `
      *,
      skillgroup_has_technology (
        technology (*),
        level
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) return { data: null, error };

  const { skillgroup_has_technology, ...restSkillGroupDetails } =
    data as SkillGroupDetails & {
      skillgroup_has_technology: { technology: Technology; level: LevelEnum }[];
    };

  const masteredTechnologies = await Promise.all(
    skillgroup_has_technology.map(
      async (sht) =>
        ({
          technology: {
            ...sht.technology,
            icon: sht.technology.icon
              ? await getImageUrlOrThrow(supabase, sht.technology.icon)
              : undefined,
          },
          level: sht.level,
        } as MasteredTechnology)
    )
  );

  return {
    data: {
      ...restSkillGroupDetails,
      icon: restSkillGroupDetails.icon
        ? await getImageUrlOrThrow(supabase, restSkillGroupDetails.icon)
        : undefined,
      masteredTechnologies,
    },
    error: null,
  };
}

export async function getSkillsAndSkillGroupsCount() {
  const supabase = await createClient();
  const {
    data: skillGroupsData,
    count,
    error,
  } = await supabase
    .from("skillgroup")
    .select("*", { count: "exact", head: false });

  const skillGroups = skillGroupsData as SkillGroup[];
  let skillsCount = 0;
  skillGroups.forEach((skillGroup) => {
    skillsCount += skillGroup.skills.length;
  });

  if (error) return { data: null, error };

  return { data: { skillGroupsCount: count || 0, skillsCount }, error: null };
}

export async function createSkillGroup(
  skillGroupCreateDTO: SkillGroupCreateDTO,
  formData: FormData
) {
  const { masteredTechnologies, ...restSkillGroupCreateDTO } =
    skillGroupCreateDTO;
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

  const newSkillGroupId = uuidv4();

  // insert the skill group icon
  const { data: iconUploadData, error: iconUploadError } =
    await insertSkillGroupIcon(supabase, formData, newSkillGroupId);

  if (iconUploadError) return { data: null, error: iconUploadError };

  const { data: createSkillGroupData, error: createSkillGroupError } =
    await supabase
      .from("skillgroup")
      .insert({
        id: newSkillGroupId,
        ...restSkillGroupCreateDTO,
        icon: iconUploadData,
        portfolio_id: portfolio.id,
      })
      .select()
      .single();

  if (createSkillGroupError)
    return { data: null, error: createSkillGroupError };

  // Insertar tecnologías relacionadas
  if (masteredTechnologies && masteredTechnologies.length > 0) {
    const { error: technologiesError } = await insertSkillGroupsTechnologies(
      supabase,
      createSkillGroupData.id,
      masteredTechnologies
    );

    if (technologiesError) return { data: null, error: technologiesError };
  }

  return { data: createSkillGroupData, error: null };
}

export async function editSkillGroup(
  id: string,
  skillGroupEditDTO: SkillGroupEditDTO,
  formData: FormData
) {
  const { masteredTechnologies, ...restSkillGroupEditDTO } = skillGroupEditDTO;
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

  // insert the skill group icon
  const { data: iconUploadData, error: iconUploadError } =
    await insertSkillGroupIcon(supabase, formData, skillGroupEntity.id);

  if (iconUploadError) return { data: null, error: iconUploadError };

  const { data: updateSkillGroupData, error: updateSkillGroupError } =
    await supabase
      .from("skillgroup")
      .update({
        ...restSkillGroupEditDTO,
        icon: iconUploadData,
      })
      .eq("id", id)
      .select()
      .single();

  if (updateSkillGroupError)
    return { data: null, error: updateSkillGroupError };

  // first delete current mastered techs
  const { error: deleteMasteredTechnologiesError } = await supabase
    .from("skillgroup_has_technology")
    .delete()
    .eq("skillgroup_id", skillGroupEntity.id);

  if (deleteMasteredTechnologiesError)
    return { data: null, error: deleteMasteredTechnologiesError };

  // insert new technologies
  if (masteredTechnologies.length > 0) {
    const { error: insertMasteredTechnologiesError } =
      await insertSkillGroupsTechnologies(
        supabase,
        skillGroupEntity.id,
        masteredTechnologies
      );
    if (insertMasteredTechnologiesError)
      return { data: null, error: insertMasteredTechnologiesError };
  }

  return { data: updateSkillGroupData, error: null };
}

// aux functions
async function insertSkillGroupIcon(
  supabase: SupabaseClient<any, "public", any>,
  formData: FormData,
  skillGroupId: string
) {
  const icon = formData.get("icon") as File;
  if (!icon) return { data: null, error: null };

  const iconPath = generateStorageFilePath(
    icon,
    `skill-groups/${skillGroupId}/icon`
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

export async function deleteSkillGroup(id: string) {
  const supabase = await createClient();

  // find the skillgroup to edit
  const { data: skillGroupFind, error: skillGroupFindError } = await supabase
    .from("skillgroup")
    .select("*")
    .eq("id", id)
    .single();

  if (skillGroupFindError) return { data: null, error: skillGroupFindError };

  const skillGroupEntity = skillGroupFind as SkillGroupDetails;

  // delete the icon
  if (skillGroupEntity.icon)
    await supabase.storage
      .from("portfolio-maker")
      .remove([skillGroupEntity.icon]);

  const { error } = await supabase.from("skillgroup").delete().eq("id", id);

  if (error) return { data: null, error };

  return {
    data: { message: "Grupo de habilidades eliminada con éxito" },
    error: null,
  };
}
