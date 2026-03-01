"use client"
import { SidebarInset } from '@/components/ui/sidebar'
import { paths } from '@/routes/path'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function SideBarInsetWrapper({ children }: Props) {
    const pathname = usePathname()
    return (
        <SidebarInset className={pathname === paths.chat_bot.root ? "flex-row" : ""}>{children}</SidebarInset>
    )
}
