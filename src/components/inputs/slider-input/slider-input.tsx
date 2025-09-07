"use client";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React from "react";

interface Props {
	label?: string
	meansure?: string
	value: [number, number]
	handleChangeFilters: (value: number[]) => void
	min?: number
	max?: number
	step?: number
}

export default function SliderInput({
	label,
	meansure,
	value,
	handleChangeFilters,
	min = 0,
	max = 1000,
	step = 10,
}: Props) {
	return (
		<div className="space-y-6">
			{label && <Label className="text-secondary">{label}</Label>}
			<div className="px-2">
				<Slider
					value={value}
					onValueChange={handleChangeFilters}
					max={max}
					min={min}
					step={step}
					className="w-full"
				/>
				<div className="flex justify-between text-sm text-muted-foreground mt-1">
					<span className="text-secondary">
						{value[0] + " " + (meansure || "")}
					</span>
					<span className="text-secondary">
						{value[1] + " " + (meansure || "")}
					</span>
				</div>
			</div>
		</div>
	)
}
