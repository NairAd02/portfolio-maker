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
    if (errors.name || errors.description || errors.mainImage) {
      setTabValue("1"); // move general information section
    } else if (errors.sourceCodeUrl || errors.deploymentUrl) {
      setTabValue("2"); // move links section
    } else if (
      errors.problem ||
      errors.solution ||
      errors.impact ||
      errors.teachings
    ) {
      setTabValue("3"); // move conent section
    } else if (errors.technologies || errors.images) {
      setTabValue("4"); // move resources section
    }
  }, [errors, setTabValue]);

  return children;
}
