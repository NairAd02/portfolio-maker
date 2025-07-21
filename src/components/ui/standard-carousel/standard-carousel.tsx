"use client"

import Autoplay from "embla-carousel-autoplay"
import React, { useContext } from "react"
import { StandardCarouselContext } from "./context/standard-carousel-context"
import useStandardCarousel from "./hooks/use-standard-carousel"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "../carousel"
import { cn } from "@/lib/utils"

interface Props<T> {
	items: T[]
	dimension: string
	itemsStyles: string
	withStylesContent?: boolean
	withProgressBar?: boolean
	variantProgressBar?: "onCarouselItem" | "belowCarouselItem"
	autoPlay?: boolean
	renderCard: (item: T) => React.ReactNode
	className?: string
	loop?: boolean
	withArrows?: boolean
	arrowsPosition?: "inside" | "outside"
	arrowsLocation?: "normal" | "bottom"
	arrowsClassName?: string
	shouldCenter?: (breakpoint: string, cantElements: number) => boolean
}

export default function StandardCarousel<T extends { id: number | string }>({
	items,
	dimension,
	renderCard,
	itemsStyles,
	className,
	withStylesContent = true,
	withProgressBar = false,
	variantProgressBar = "onCarouselItem",
	autoPlay = false,
	loop = false,
	withArrows = false,
	arrowsPosition = "inside",
	arrowsLocation = "normal",
	arrowsClassName = "",
	shouldCenter,
}: Props<T>) {
	const { isCentered } = useStandardCarousel({
		cantElements: items.length,
		shouldCenter,
	})

	const { current, count, handleClick, setApi } = useContext(
		StandardCarouselContext,
	)

	const plugins = autoPlay
		? [Autoplay({ delay: 10000, stopOnInteraction: true })]
		: undefined

	return (
		<div className="relative w-full group">
			<Carousel
				plugins={plugins}
				setApi={setApi}
				opts={{
					align: "center",
					loop,
				}}
				style={{
					maxWidth: dimension,
				}}
				className="relative"
			>
				<CarouselContent
					className={
						withStylesContent
							? cn(
									"flex pb-9 pt-6",
									isCentered
										? "justify-center"
										: "justify-start",
									className,
									arrowsLocation === "bottom" ? "pb-12" : "",
								)
							: ""
					}
				>
					{items.map(item => (
						<CarouselItem key={item.id} className={itemsStyles}>
							{renderCard(item)}
						</CarouselItem>
					))}
				</CarouselContent>
				{withArrows && arrowsLocation === "normal" && (
					<div className="hidden sm:flex">
						<CarouselPrevious
							className={cn(
								"absolute left-2 h-8 w-8 rounded-full",
								arrowsPosition === "inside"
									? "top-1/2 -translate-y-1/2"
									: "-left-10 top-1/2 -translate-y-1/2 -translate-x-1/2",
								arrowsClassName,
							)}
						/>
						<CarouselNext
							className={cn(
								"absolute right-2 h-8 w-8 rounded-full",
								arrowsPosition === "inside"
									? "top-1/2 -translate-y-1/2"
									: "-right-9 2xl:right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
								arrowsClassName,
							)}
						/>
					</div>
				)}
				{withArrows && arrowsLocation === "bottom" && (
					<div className="absolute bottom-2 left-0 w-full justify-between px-2 z-10">
						<CarouselPrevious
							className={cn(
								"2xs:h-12 2xs:w-12 rounded-full left-[36%] 2xs:left-[38%] sm:left-[42%] lg:left-[45%] 2xl:left-[43%]",
								arrowsClassName,
							)}
						/>
						<CarouselNext
							className={cn(
								"2xs:h-12 2xs:w-12 rounded-full right-[36%] 2xs:right-[38%] sm:right-[42%] lg:right-[45%] 2xl:right-[48%]",
								arrowsClassName,
							)}
						/>
					</div>
				)}
			</Carousel>
			{withProgressBar && (
				<div
					className={`absolute ${
						variantProgressBar === "onCarouselItem"
							? "bottom-4"
							: "bottom-0"
					} left-1/2 flex -translate-x-1/2 gap-2`}
				>
					{Array.from({ length: count }).map((_, index) => (
						<span
							key={index}
							onClick={handleClick(index)}
							className={cn(
								"size-2 cursor-pointer rounded-full transition-colors sm:size-3",
								current === index
									? "bg-primary"
									: "bg-gray-300",
							)}
						/>
					))}
				</div>
			)}
		</div>
	)
}
