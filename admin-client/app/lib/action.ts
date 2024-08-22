'use server'

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function revalidateDashboard() {
    revalidatePath('/dashboard')
    redirect('/dashboard')
}

const loginSchema = z.object({
    username: z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string"
    }).trim().min(1, { 
        message: "Username can't be a whitespace string" 
    }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    }).trim().min(1, { 
        message: "Password can't be a whitespace string" 
    })
})

export type LoginFormState = {
    errors?: {
        username?: string[],
        password?: string[]
    },
    message?: string | null
}

export async function logIn(prevState: LoginFormState, formData: FormData): Promise<LoginFormState>{
    const validateFields = loginSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password')
    })

    if(!validateFields.success) {
        const errors = validateFields.error.flatten().fieldErrors
        console.log("-------------------------------------")
        console.log(errors)
        console.log("-------------------------------------")

        return {
            errors: errors,
            message: "Invalid Form. Try filling it in correctly and submit again."
        }
    }
    else {
        console.log("Passed validation")

        // Pack data and send to express server
        // Get a token and store it somewhere

        revalidatePath("/dashboard")
        redirect("/dashboard")
    }
}