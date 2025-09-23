import GeneralDataContainer from "@/sections/general-data/general-data-container";
import React, { ReactNode } from "react";

interface Props {
  personal_information: ReactNode;
  projects: ReactNode;
  experiences: ReactNode;
}

export default function GeneralDataLayout({
  personal_information: personalInformation,
  projects: projectsSection,
  experiences: experiencesSection,
}: Props) {
  return (
    <>
      <GeneralDataContainer
        personalInformation={personalInformation}
        projectsSection={projectsSection}
        experiencesSection={experiencesSection}
      />
    </>
  );
}
