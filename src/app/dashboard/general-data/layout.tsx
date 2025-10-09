import GeneralDataContainer from "@/sections/general-data/general-data-container";
import React, { ReactNode } from "react";

interface Props {
  personal_information: ReactNode;
  projects: ReactNode;
  experiences: ReactNode;
  skills: ReactNode;
  certifications: ReactNode;
  blogs: ReactNode;
  about: ReactNode;
  contact: ReactNode;
}

export default function GeneralDataLayout({
  personal_information: personalInformation,
  projects: projectsSection,
  experiences: experiencesSection,
  skills: skillsSection,
  certifications: certificationsSection,
  blogs: blogsSection,
  about: aboutSection,
  contact: contactSection,
}: Props) {
  return (
    <>
      <GeneralDataContainer
        personalInformation={personalInformation}
        projectsSection={projectsSection}
        experiencesSection={experiencesSection}
        skillsSection={skillsSection}
        certificationsSection={certificationsSection}
        blogsSection={blogsSection}
        aboutSection={aboutSection}
        contactSection={contactSection}
      />
    </>
  );
}
