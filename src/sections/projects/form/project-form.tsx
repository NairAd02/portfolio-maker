"use client";
import { useMemo } from "react";
import { Upload, Link, FileText, Lightbulb } from "lucide-react";
import { TabsPanelProvider } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import { TabsContainer } from "@/components/ui/tabs-panel/tabs-panel";
import ProjectFormSectionsController from "./form-sections/project-form-sections-controller";
import ProjectGeneralInformationSection from "./form-sections/project-general-information-section/project-general-information-section";
import ProjectLinksSection from "./form-sections/project-links-section/project-links-section";
import ProjectContentSection from "./form-sections/project-content-section/project-content-section";
import ProjectResourcesSection from "./form-sections/project-resources-section/project-resources-section";

interface Props {
  imageRecived?: { loading: boolean; error: string | null };
  imagesRecived?: { loading: boolean; error: string | null };
}

export default function ProjectForm({ imageRecived, imagesRecived }: Props) {
  const tabs = useMemo(
    () => [
      {
        label: "Información General",
        value: "1",
        icon: <FileText className="w-4 h-4" />,
        component: (
          <ProjectGeneralInformationSection imageRecived={imageRecived} />
        ),
      },
      {
        label: "Enlaces",
        icon: <Link className="w-4 h-4" />,
        value: "2",
        component: <ProjectLinksSection />,
      },
      {
        label: "Contenido",
        icon: <Lightbulb className="w-4 h-4" />,
        value: "3",
        component: <ProjectContentSection />,
      },
      {
        label: "Recursos",
        icon: <Upload className="w-4 h-4" />,
        value: "4",
        component: <ProjectResourcesSection imagesRecived={imagesRecived} />,
      },
    ],
    [imageRecived, imagesRecived]
  );

  return (
    <TabsPanelProvider initialTab={tabs[0].value}>
      <ProjectFormSectionsController>
        <TabsContainer
          tabs={tabs}
          classNameTabsContent="flex-1 overflow-auto flex flex-col max-h-[70vh] p-2"
        />
      </ProjectFormSectionsController>
    </TabsPanelProvider>
  );
}
