'use server'

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function revalidateDashboard() {
    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function revalidateEvents() {
    revalidatePath('/events')
    redirect('/events')
}

export async function revalidateGames() {
    revalidatePath('/games')
    redirect('/games')
}