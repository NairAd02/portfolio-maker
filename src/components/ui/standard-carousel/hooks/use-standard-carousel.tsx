
import { useBreakpoint } from "@/hooks/screen/use-breakpoint"
import { useEffect, useState } from "react"

interface Props {
	cantElements: number
	shouldCenter?: (breakpoint: string, cantElements: number) => boolean
}

const defaultShouldCenter = (breakpoint: string, cantElements: number) => {
	switch (breakpoint) {
		case "3xl":
			return cantElements < 3
		case "2xl":
			return cantElements < 5
		case "xl":
			return cantElements < 4
		case "lg":
			return cantElements < 4
		case "md":
			return cantElements < 2
		default:
			return cantElements < 2
	}
}

export default function useStandardCarousel({
	cantElements,
	shouldCenter = defaultShouldCenter,
}: Props) {
	const breakpoint = useBreakpoint()
	const [isCentered, setIsCentered] = useState(false)

	useEffect(() => {
		setIsCentered(shouldCenter(breakpoint, cantElements))
	}, [breakpoint, cantElements, shouldCenter])

	return { isCentered }
}
