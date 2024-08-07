'use server'

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function revalidateDashboard() {
    revalidatePath('/dashboard')
    redirect('/dashboard')
}