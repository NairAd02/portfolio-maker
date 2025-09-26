"use server";

import { createClient } from "../supabase/server";
import {
  CertificationGroup,
  CertificationGroupCreateDTO,
  CertificationGroupDetails,
  CertificationGroupEditDTO,
} from "../types/certification-groups";
import { Certification } from "../types/certifications";
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
        id: certificationGroup.id,
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

export async function getCertificationGroupById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certificationgroup")
    .select(
      `
      *,
      certification_has_certificationgroup (
        certification (*)
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) return { data: null, error };

  const { certification_has_certificationgroup, ...rest } = data;

  const certifications = certification_has_certificationgroup.map(
    (thp: { certification: Certification }) => thp.certification
  );

  return {
    data: {
      ...rest,
      certifications,
    } as CertificationGroupDetails,
    error: null,
  };
}

export async function getCertificationGroupsCount() {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("certificationgroup")
    .select("*", { count: "exact", head: true });

  if (error) return { data: null, error };

  return { data: count || 0, error: null };
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

export async function editCertificationGroup(
  id: string,
  certificationGroupEditDTO: CertificationGroupEditDTO
) {
  const { certifications, ...restCertificationGroupEditDTO } =
    certificationGroupEditDTO;
  const supabase = await createClient();

  // find the certification group to edit
  const { error: certificationGroupFindError } = await supabase
    .from("certificationgroup")
    .select("*")
    .eq("id", id)
    .single();

  if (certificationGroupFindError)
    return { data: null, error: certificationGroupFindError };

  const {
    data: updateCertificationGroupData,
    error: updateCertificationGroupError,
  } = await supabase
    .from("certificationgroup")
    .update({
      ...restCertificationGroupEditDTO,
    })
    .eq("id", id)
    .select()
    .single();

  if (updateCertificationGroupError)
    return { data: null, error: updateCertificationGroupError };

  // update the certifications

  // first delete current certifications
  const { error: deleteCertifications } = await supabase
    .from("certification_has_certificationgroup")
    .delete()
    .eq("certification_group_id", id);

  if (deleteCertifications) return { data: null, error: deleteCertifications };

  // insert new certifications
  if (certifications && certifications.length > 0) {
    const { error: insertCertificationsError } =
      await insertCertificationsGroups(supabase, id, certifications);
    if (insertCertificationsError)
      return { data: null, error: insertCertificationsError };
  }

  return { data: updateCertificationGroupData, error: null };
}

export async function deleteCertificationGroup(id: string) {
  const supabase = await createClient();

  // find the certification group to delete
  const { error: certificationGroupFindError } = await supabase
    .from("certificationgroup")
    .select("*")
    .eq("id", id)
    .single();

  if (certificationGroupFindError)
    return { data: null, error: certificationGroupFindError };

  const { error } = await supabase
    .from("certificationgroup")
    .delete()
    .eq("id", id);

  if (error) return { data: null, error };

  return {
    data: { message: "Grupo de Certificaciones eliminado con éxito" },
    error: null,
  };
}
