"use client"
import React, { createContext, useState } from "react"

interface Props {
	preview: string
	setPreview: (preview: string) => void
}

const defaultProps: Props = {
	preview: "",
	setPreview: () => {
		throw new Error("setPreview")
	},
}

export const PreviewContext = createContext<Props>(defaultProps)

export function PreviewProvider({ children }: { children: React.ReactNode }) {
	const [preview, setPreview] = useState("")

	return (
		<PreviewContext.Provider
			value={{
				preview,
				setPreview,
			}}
		>
			{children}
		</PreviewContext.Provider>
	)
}
