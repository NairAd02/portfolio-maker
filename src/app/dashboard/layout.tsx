import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashBoardLayoutAppSidebar } from "@/sections/dashboard-layout/components/app-sidebar/dashboard-layout-app-sidebar";
import DashBoardLayoutHeader from "@/sections/dashboard-layout/components/header/dashboard-layout-header";
import Modal from "@/components/modal/modal";
import CertificationDetailsModalContainer from "@/sections/certifications/details/certification-details-modal-container";
import { modalTypes } from "@/components/modal/types/modalTypes";
import SelectableCertificationsModalContainer from "@/sections/certifications/components/selectable-certifications/selectable-certifications-modal-container";
import SideBarInsetWrapper from "@/sections/dashboard-layout/components/sidebar-inset-wrapper/sidebar-inset-wrapper";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashBoardLayoutAppSidebar />
      <SideBarInsetWrapper>
        <DashBoardLayoutHeader />
        <div className="container bg-background mx-auto p-2">{children}</div>
        {/* certifications modals */}
        <Modal
          className="max-h-[88vh]"
          maxWidth="max-w-xl"
          formPath={modalTypes.certificationDetailsModal.name}
        >
          <CertificationDetailsModalContainer />
        </Modal>
        <Modal
          formPath={modalTypes.selectableCertificationsModal.name}
          maxWidth="max-w-2xl"
          className="min-h-[90vh]"
        >
          <SelectableCertificationsModalContainer />
        </Modal>
      </SideBarInsetWrapper>
    </SidebarProvider>
  );
}
