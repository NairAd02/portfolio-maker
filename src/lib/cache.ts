'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateServerPath = async (path: string, profile: "layout" | "page" = "layout") => {
    revalidatePath(path, profile)
}

export const revalidateServerTags = async (tag: string, profile: "layout" | "page" = "layout") => {
    revalidateTag(tag, profile)
}
