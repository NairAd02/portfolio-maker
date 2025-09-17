export interface InfoModal {
  name: string;
  // matadata
  entity?: string; // id entity
  secondaryEntity?: string;
  elements?: any[];
  actionInsert?: (element: any) => void;
  onClose?: () => void;
  onOpen?: () => void;
  actionExecute?: () => void;
}
export interface SectionModal {
  name: string;
  title?: string;
}
export interface ModalTypes {
  newProyectModal: SectionModal;
  editProyectModal: SectionModal;
  previewImageModal: SectionModal;
  selectableCertificationsModal: SectionModal;
}

export const modalTypes: ModalTypes = {
  newProyectModal: {
    name: "newProyectModal",
    title: "Formulario de Creación de Proyecto",
  },
  editProyectModal: {
    name: "editProyectModal",
    title: "Formulario de Edición de Proyecto",
  },
  previewImageModal: {
    name: "previewImageModal",
    title: "Visor de Imagen",
  },
  selectableCertificationsModal: {
    name: "selectableCertificationsModal",
    title: "Selección de Certificaciones",
  },
};
