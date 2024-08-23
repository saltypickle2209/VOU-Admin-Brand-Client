'use server'

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function revalidateDashboard() {
    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function revalidateUsers() {
    revalidatePath('/users')
    redirect('/users')
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

const userEditSchema = z.object({
    avatar: z.union([
        z.instanceof(File, {
            message: "Avatar must be JPEG or PNG file"
        }).refine(file => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            return allowedTypes.includes(file.type);
        }, { 
            message: "File type must be JPEG or PNG"
        }),
        z.string({
            required_error: "Avatar URL is required",
            invalid_type_error: "Avatar must be a string or JPEG or PNG file"
        }).url({
            message: "Avatar URL is invalid"
        })
    ]),
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }).trim().min(1, { 
        message: "Name can't be a whitespace string" 
    }).max(200, {
        message: "Name is too long" 
    }),
    username: z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string"
    }).trim().min(1, { 
        message: "Username can't be a whitespace string" 
    }).max(200, {
        message: "Username is too long" 
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).trim().min(1, { 
        message: "Email can't be a whitespace string" 
    }).max(200, {
        message: "Email's length cannot exceed 200 characters"
    }).email("Invalid email format"),
    phone: z.string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number must be a string"
    }).trim().min(1, { 
        message: "Phone number can't be a whitespace string" 
    }).regex(/^\d{10,11}$/, {
        message: "Phone number should have 10 or 11 numbers"
    }),
    role: z.enum(['user', 'brand', 'admin'], { message: "Invalid choice"}),
    dob: z.string({
        required_error: "Date of birth is required",
        invalid_type_error: "Date of birth must be a string"
    }).date("Invalid date of birth"),
    gender: z.enum(['male', 'female', 'other'], { message: "Invalid choice"}),
})

export type UserEditFormState = {
    errors?: {
        avatar?: string[],
        name?: string[],
        username?: string[],
        email?: string[],
        phone?: string[],
        role?: string[],
        dob?: string[],
        gender?: string[]
    },
    message?: string | null
}

export async function editUser(prevState: UserEditFormState, formData: FormData): Promise<UserEditFormState>{
    const validateFields = userEditSchema.safeParse({
        avatar: formData.get('avatar'),
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        role: formData.get('role'),
        dob: formData.get('dob'),
        gender: formData.get('gender')
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

        revalidatePath("/users")
        redirect("/users")
    }
}

export async function toggleUserActivation(userId: string) {
    console.log("toggle activation")
    // send request to express server

    revalidatePath("/users")
    redirect("/users")
}