"use client"
import React, { createContext } from "react"
import useModal from "../hooks/useModal"
import { InfoModal } from "../types/modalTypes"

interface Props {
	currentModal: InfoModal[]
	handleOpenModal: (infoModal: InfoModal) => void
	handleCloseModal: (modalName: string, callOnClose?: boolean) => void
	onOpenChange: (modalName: string) => void
	isModalOpen: (modalName: string) => boolean
	getInfoModal: (modalName: string) => InfoModal | undefined
}

const defaultProps: Props = {
	currentModal: [],
	handleOpenModal: () => {
		throw new Error("handleOpenModal no está definido.")
	},
	handleCloseModal: () => {
		throw new Error("handleCloseModal no está definido.")
	},
	onOpenChange: () => {
		throw new Error("onOpenChange no está definido.")
	},
	isModalOpen: () => {
		throw new Error("isModalOpen no está definido.")
	},
	getInfoModal: () => {
		throw new Error("getInfoModal no está definido.")
	},
}

export const ModalContext = createContext<Props>(defaultProps)

export function ModalProvider({ children }: { children: React.ReactNode }) {
	const {
		currentModal,
		handleOpenModal,
		handleCloseModal,
		onOpenChange,
		isModalOpen,
		getInfoModal,
	} = useModal()

	return (
		<ModalContext.Provider
			value={{
				currentModal,
				handleCloseModal,
				handleOpenModal,
				onOpenChange,
				isModalOpen,
				getInfoModal,
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}
