"use client"
import { useState, useEffect } from "react"

export function useBreakpoint() {
	const [breakpoint, setBreakpoint] = useState<
		"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
	>("2xl")

	useEffect(() => {
		const calculateBreakpoint = () => {
			const width = window.innerWidth
			if (width < 480) {
				setBreakpoint("xs")
			} else if (width >= 480 && width < 640) {
				setBreakpoint("sm")
			} else if (width >= 640 && width < 768) {
				setBreakpoint("md")
			} else if (width >= 768 && width < 1024) {
				setBreakpoint("lg")
			} else if (width >= 1024 && width < 1280) {
				setBreakpoint("xl")
			} else if (width >= 1280 && width < 1536) {
				setBreakpoint("2xl")
			} else if (width >= 1600) {
				setBreakpoint("3xl")
			}
		}

		calculateBreakpoint()

		window.addEventListener("resize", calculateBreakpoint)

		return () => window.removeEventListener("resize", calculateBreakpoint)
	}, [])

	return breakpoint
}
