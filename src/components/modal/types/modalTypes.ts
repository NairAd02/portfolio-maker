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
  previewImageModal: SectionModal;
}

export const modalTypes: ModalTypes = {
  newProyectModal: {
    name: "newProyectModal",
    title: "Formulario de Creación de Proyecto",
  },
  previewImageModal: {
    name: "previewImageModal",
    title: "Visor de Imagen",
  },
};
