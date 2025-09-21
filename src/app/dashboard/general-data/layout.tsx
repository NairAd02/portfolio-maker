import GeneralDataContainer from "@/sections/general-data/general-data-container";
import React, { ReactNode } from "react";

interface Props {
  personal_information: ReactNode;
  projects: ReactNode;
}

export default function GeneralDataLayout({
  personal_information: personalInformation,
  projects: projectsSection,
}: Props) {
  return (
    <>
      <GeneralDataContainer
        personalInformation={personalInformation}
        projectsSection={projectsSection}
      />
    </>
  );
}
