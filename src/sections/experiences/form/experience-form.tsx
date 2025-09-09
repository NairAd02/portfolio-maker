"use client";
import { useMemo } from "react";
import { CircleEllipsis, FileText } from "lucide-react";
import { TabsPanelProvider } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import { TabsContainer } from "@/components/ui/tabs-panel/tabs-panel";
import ExperienceGeneralInformationSection from "./form-sections/experience-general-information-section/experience-general-information-section";
import ExperienceAdditionalInformationSection from "./form-sections/experience-additional-information-section/experience-additional-information-section";
import ExperienceFormSectionsController from "./form-sections/experience-form-sections-controller";

interface Props {
  imageRecived?: { loading: boolean; error: string | null };
}

export default function ExperienceForm({ imageRecived }: Props) {
  const tabs = useMemo(
    () => [
      {
        label: "Información General",
        value: "1",
        icon: <FileText className="w-4 h-4" />,
        component: (
          <ExperienceGeneralInformationSection imageRecived={imageRecived} />
        ),
      },
      {
        label: "Información Adicional",
        icon: <CircleEllipsis className="w-4 h-4" />,
        value: "2",
        component: <ExperienceAdditionalInformationSection />,
      },
    ],
    [imageRecived]
  );

  return (
    <TabsPanelProvider initialTab={tabs[0].value}>
      <ExperienceFormSectionsController>
        <TabsContainer
          tabs={tabs}
          classNameTabsContent="flex-1 overflow-auto flex flex-col h-[70vh] p-2"
        />
      </ExperienceFormSectionsController>
    </TabsPanelProvider>
  );
}
