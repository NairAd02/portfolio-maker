"use client"
import { SidebarInset } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function SideBarInsetWrapper({ children }: Props) {
    const pathname = usePathname()
    return (
        <SidebarInset className={pathname === "/dashboard/chat-bot" ? "flex-row" : ""}>{children}</SidebarInset>
    )
}
