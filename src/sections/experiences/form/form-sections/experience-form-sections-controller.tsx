"use client";
import { TabsPanelContext } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import { ReactNode, useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  children: ReactNode;
}

export default function ExperienceFormSectionsController({ children }: Props) {
  const { formState } = useFormContext();
  const { errors } = formState;
  const { setTabValue } = useContext(TabsPanelContext);

  useEffect(() => {
    if (
      errors.mainImage ||
      errors.company ||
      errors.position ||
      errors.description ||
      errors.startdate ||
      errors.enddate
    ) {
      setTabValue("1"); // move general information section
    } else if (errors.achievements || errors.technologies) {
      setTabValue("2"); // move additional information section
    }
  }, [errors, setTabValue]);

  return children;
}
