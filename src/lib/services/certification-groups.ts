"use server";

import { createClient } from "../supabase/server";
import { CertificationGroup } from "../types/certification-groups";

export async function getCertificationGroupsList() {
  const supabase = await createClient();
  const { data: certificationGroupsData, error } = await supabase.from(
    "certificationgroup"
  ).select(`
      *,
      certification_has_certificationgroup (
        certification (title)
      )
    `);
  const certificationGroups = certificationGroupsData as (CertificationGroup & {
    certification_has_certificationgroup: { title: string }[];
  })[];

  return {
    data: certificationGroups.map((certificationGroup) => ({
      title: certificationGroup.title,
      certificationTitles:
        certificationGroup.certification_has_certificationgroup.map(
          (certification) => certification.title
        ),
    })) as CertificationGroup[],
    error,
  };
}
