import ModalLayoutContainer from "@/sections/modal-page/components/modal-layout/modal-layout-container";

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
  modalClassName?: string
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <ModalLayoutContainer>{children}</ModalLayoutContainer>
    </div>
  );
}
