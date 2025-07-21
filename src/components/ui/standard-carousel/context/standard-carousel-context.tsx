"use client"

import React, { createContext, useCallback, useState } from "react"
import { CarouselApi } from "../../carousel"
import { EmblaCarouselType } from "embla-carousel"

interface Props {
	current: number
	count: number
	setApi: React.Dispatch<React.SetStateAction<EmblaCarouselType | undefined>>
	setCurrent: React.Dispatch<React.SetStateAction<number>>
	handleClick: (index: number) => () => void
}

const defaultProps: Props = {
	current: 0,
	count: 0,
	setApi: () => {
		throw new Error("setApi no está definido.")
	},
	setCurrent: () => {
		throw new Error("setCurrent no está definido.")
	},
	handleClick: () => {
		throw new Error("handleClick no está definido.")
	},
}

export const StandardCarouselContext = createContext<Props>(defaultProps)

export function StandardCarouselProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [current, setCurrent] = useState(0)
	const [api, setApi] = React.useState<CarouselApi>()
	const [count, setCount] = React.useState(0)
	React.useEffect(() => {
		if (!api) {
			return
		}
		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap())

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap())
		})
	}, [api])

	const handleClick = useCallback(
		(index: number) => () => {
			api?.scrollTo(index)
		},
		[api],
	)
	return (
		<StandardCarouselContext.Provider
			value={{
				current,
				setCurrent,
				count,
				setApi,
				handleClick,
			}}
		>
			{children}
		</StandardCarouselContext.Provider>
	)
}
