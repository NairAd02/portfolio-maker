import Link from "next/link"
import React, { ReactNode } from "react"

interface Props {
	children: ReactNode
	href: string
}

export default function NavigationComponent({ children, href }: Props) {
	return <Link href={href}>{children}</Link>
}
