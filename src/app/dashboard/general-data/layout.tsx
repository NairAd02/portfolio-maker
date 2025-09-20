import GeneralDataContainer from "@/sections/general-data/general-data-container";
import React, { ReactNode } from "react";

interface Props {
  "personal-information": ReactNode;
}

export default function GeneralDataLayout({
  "personal-information": personalInformation,
}: Props) {
  return (
    <>
      <GeneralDataContainer personalInformation={personalInformation} />
    </>
  );
}
