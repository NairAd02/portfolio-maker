"use client"
import React, {
  ForwardedRef,
  forwardRef,
  useContext,
  useImperativeHandle,
} from "react";
import Image from "next/image";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { PreviewContext } from "./context/preview-context";

interface Props {
  preview: string;
  width?: number;
  height?: number;
  rounded?: string;
}

// define expositions
export type PreviewImageHandle = {
  setIsDialogOpen: (state: boolean) => void;
};

const PreviewImage = forwardRef(function PreviewImage(
  { preview, width = 500, height, rounded }: Props,
  ref: ForwardedRef<unknown>
) {
  const { handleOpenModal } = useContext(ModalContext);
  const { setPreview } = useContext(PreviewContext);
  const handlePreview = () => {
    setPreview(preview);
    handleOpenModal({ name: modalTypes.previewImageModal.name });
  };
  useImperativeHandle(ref, () => ({
    handlePreview,
  }));

  return (
    <>
      <div className="cursor-pointer" onClick={handlePreview}>
        <div
          className={
            "relative overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105" +
            (rounded ? ` rounded-${rounded}` : "")
          }
          style={{
            maxWidth: width ? `${width}px` : "100%",
            maxHeight: height ? `${height}px` : "100%",
          }}
        >
          <Image
            src={preview}
            alt="Testimonial author"
            width={500}
            height={500}
            className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            quality={100}
          />
        </div>
      </div>
    </>
  );
});

export default PreviewImage;
