'use server'

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

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

// export const questionSchema = z.object({
//     question: z.string().trim().min(1, "Question text is required"),
//     answerA: z.string().trim().min(1, "This field musn't be empty"),
//     answerB: z.string().trim().min(1, "This field musn't be empty"),
//     answerC: z.string().trim().min(1, "This field musn't be empty"),
//     answerD: z.string().trim().min(1, "This field musn't be empty"),
//     correct_answer: 
// })

export async function createGames(formData: FormData){
    console.log(formData.get('poster'))
}