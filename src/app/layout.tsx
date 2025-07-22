import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/sections/root-layout/components/header/header";
import FooterRendering from "@/sections/root-layout/components/footer/footer-rendering";
import ProgressBar from "@/components/providers/progress-bar.";
import { PreviewProvider } from "@/components/preview-image/context/preview-context";
import { ModalProvider } from "@/components/modal/context/modalContext";
import PreviewModal from "@/components/preview-image/preview-modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio-Maker",
  description: "Sistema para la creación de portafolios personalizados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider>
          <PreviewProvider>
            <ProgressBar>
              <PreviewModal />
              <div className="flex min-h-screen flex-col">
                <Header />
                {children}
                <FooterRendering />
              </div>
            </ProgressBar>
          </PreviewProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
