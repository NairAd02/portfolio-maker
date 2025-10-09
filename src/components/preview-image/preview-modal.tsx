"use client";

import React, { useContext } from "react";
import { PreviewContext } from "./context/preview-context";
import Image from "next/image";
import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Image as ImageIcon } from "lucide-react";

export default function PreviewModal() {
  const { preview } = useContext(PreviewContext);
  return (
    <Modal
      title={modalTypes.previewImageModal.title}
      icon={<ImageIcon />}
      formPath={modalTypes.previewImageModal.name}
      maxWidth="max-w-xl"
    >
      <div className="flex items-center max-h-[85vh] justify-center p-2">
        <Image
          src={preview}
          alt="Testimonial author"
          width={500}
          height={500}
          className="object-cover"
          quality={100}
        />
      </div>
    </Modal>
  );
}
