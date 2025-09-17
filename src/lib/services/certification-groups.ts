"use server";

import { createClient } from "../supabase/server";
import {
  CertificationGroup,
  CertificationGroupCreateDTO,
} from "../types/certification-groups";
import { getLoggedUser } from "./auth";
import { insertCertificationsGroups } from "./certifications";

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
    certification_has_certificationgroup: {
      certification: { title: string };
    }[];
  })[];

  return {
    data: certificationGroups.map((certificationGroup) => {
      return {
        title: certificationGroup.title,
        certificationTitles:
          certificationGroup.certification_has_certificationgroup.map(
            (certification) => certification.certification.title
          ),
      };
    }) as CertificationGroup[],
    error,
  };
}

export async function createCertificationGroup(
  certificationGroupCreateDTO: CertificationGroupCreateDTO
) {
  const { certifications, ...restCertificationGroupCreateDTO } =
    certificationGroupCreateDTO;
  const supabase = await createClient();

  // get the session
  const { data: sessionData, error: loggedUserError } = await getLoggedUser();

  if (!sessionData || loggedUserError) return { data: null, loggedUserError };

  // find the user portfolio
  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select("id")
    .eq("user_id", sessionData.user.id)
    .single();

  if (portfolioError) return { data: null, error: portfolioError };

  const {
    data: createCertificationGroupData,
    error: createCertificationGroupError,
  } = await supabase
    .from("certificationgroup")
    .insert({
      ...restCertificationGroupCreateDTO,
      portfolio_id: portfolio.id,
    })
    .select()
    .single();

  if (createCertificationGroupError)
    return { data: null, error: createCertificationGroupError };

  // Insertar certificaciones relacionadas
  if (certifications && certifications.length > 0) {
    const { error: certificationsError } = await insertCertificationsGroups(
      supabase,
      createCertificationGroupData.id,
      certifications
    );

    if (certificationsError) return { data: null, error: certificationsError };
  }

  return { data: createCertificationGroupData, error: null };
}
