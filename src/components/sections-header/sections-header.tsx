import { type ReactNode } from "react";
import AddButtonSectionsHeader from "./add-button-sections-header/add-button-sections-header";

interface Props {
  sectionTitle: string;
  sectionDescription: string;
  sectionIcon: ReactNode;
  addButton?: {
    buttonText?: string;
    creationPath: string;
    isModalRedirect?: boolean;
  };
}

export default function SectionsHeader({
  sectionTitle,
  sectionDescription,
  sectionIcon,
  addButton,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 mb-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center p-3 text-white bg-primary rounded-lg">
          {sectionIcon}
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-800">{sectionTitle}</h1>
          <p className="text-sm text-gray-500">{sectionDescription}</p>
        </div>
      </div>
      {addButton && (
        <AddButtonSectionsHeader
          buttonText={addButton.buttonText}
          creationPath={addButton.creationPath}
          isModalRedirect={addButton.isModalRedirect}
        />
      )}
    </div>
  );
}
