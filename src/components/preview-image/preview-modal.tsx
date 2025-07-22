"use client"

import React, { useContext } from "react"
import { PreviewContext } from "./context/preview-context"
import Image from "next/image"
import Modal from "@/components/modal/modal"
import { modalTypes } from "@/components/modal/types/modalTypes"

export default function PreviewModal() {
	const { preview } = useContext(PreviewContext)
	return (
		<Modal formPath={modalTypes.previewImageModal.name}>
			<div className="flex items-center justify-center p-2">
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
	)
}
