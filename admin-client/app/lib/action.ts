'use server'

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { baseURL } from "./definition"
import { cookies } from "next/headers"
import { getToken } from "./server_utility"

export async function revalidateDashboard() {
    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function revalidateUsers() {
    revalidatePath('/users')
    redirect('/users')
}

const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).trim().min(1, { 
        message: "Email can't be a whitespace string" 
    }).email("Invalid email format"),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    }).trim().min(1, { 
        message: "Password can't be a whitespace string" 
    })
})

export type LoginFormState = {
    errors?: {
        email?: string[],
        password?: string[]
    },
    message?: string | null
}

export async function logIn(prevState: LoginFormState, formData: FormData): Promise<LoginFormState>{
    const validateFields = loginSchema.safeParse({
        email: formData.get('email'),
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

        try{
            const response = await fetch(`${baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": formData.get('email'),
                    "password": formData.get('password')
                })
            })
        
            if(!response.ok){
                const errorMessage = await response.text()
                return {
                    message: errorMessage
                }
            }
    
            const data = await response.json()
            //console.log(data.token)
            
            cookies().set('token', data.token, {
                httpOnly: true,
                maxAge: 60 * 60
            })
        } catch (error) {
            return {
                message: "Something went wrong. Try again later."
            }
        }

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
        try{
            const response = await fetch(`${baseURL}/auth/users/edit/${formData.get('id') as string}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    username: formData.get('username'),
                    role: formData.get('role'),
                    phone: formData.get('phone'),
                    status: formData.get('status')
                })
            })
        
            if(!response.ok){
                const errorMessage = await response.text()
                return {
                    message: errorMessage
                }
            }
        } catch (error) {
            return {
                message: "Something went wrong. Try again later."
            }
        }

        revalidatePath("/users")
        redirect("/users")
    }
}

const brandEditSchema = z.object({
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
    domain: z.string({
        required_error: "Domain is required",
        invalid_type_error: "Domain must be a string"
    }).trim().min(1, { 
        message: "Domain can't be a whitespace string" 
    }).max(200, {
        message: "Domain's length cannot exceed 200 characters"
    }),
    address: z.string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string"
    }).trim().min(1, { 
        message: "Address can't be a whitespace string" 
    }).max(200, {
        message: "Address's length cannot exceed 200 characters"
    }),
    latitude: z.coerce.number({
        required_error: "Latitude is required",
        invalid_type_error: "Latitude must be a number"
    }).gte(-90, "Latitude must be between -90 and 90").lte(90, "Latitude must be between -90 and 90"),
    longitude: z.coerce.number({
        required_error: "Longitude is required",
        invalid_type_error: "Longitude must be a number"
    }).gte(-180, "Longitude must be between -180 and 180").lte(180, "Latitude must be between -180 and 180")
})

export type BrandEditFormState = {
    errors?: {
        avatar?: string[],
        name?: string[],
        username?: string[],
        email?: string[],
        phone?: string[],
        role?: string[],
        domain?: string[],
        address?: string[],
        latitude?: string[],
        longitude?: string[],
    },
    message?: string | null
}

export async function editBrand(prevState: BrandEditFormState, formData: FormData): Promise<BrandEditFormState>{
    const validateFields = brandEditSchema.safeParse({
        avatar: formData.get('avatar'),
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        role: formData.get('role'),
        domain: formData.get('domain'),
        address: formData.get('address'),
        latitude: formData.get('latitude'),
        longitude: formData.get('longitude'),
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
    try{
        const response = await fetch(`${baseURL}/auth/users/toggleUser/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
    
        if(!response.ok){
            const errorMessage = await response.text()
            return {
                message: errorMessage
            }
        }
    } catch (error) {
        return {
            message: "Something went wrong. Try again later."
        }
    }

    revalidatePath("/users")
    redirect("/users")
}

export async function deleteUser(userId: string, formData: FormData) {
    console.log("deleted user with ID " + userId)
    // send request to express server

    revalidatePath("/users")
    redirect("/users")
}

const gameDataSchema = z.object({
    gameName: z
    .string()
    .min(1, {message: "(*)Game's name is required"}),
    description: z
    .string()
    .min(1, {message: "(*)Game's description is required"}),
    instruction: z
    .string()
    .min(1, {message: "(*)Game's instruction is required"}),
    gameImage: z
    .instanceof(File, {message: "(*)Game's image is required"})
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
        message: "(*)Only JPEG or PNG is supported"
    })
})

export type UpdateGameDataFormState = {
    errors?: {
        gameName?: string[],
        description?: string[],
        instruction?: string[],
        gameImage?: string[],
    },
    message?: string | null
}

export async function updateGameData(prevState: UpdateGameDataFormState, formData: FormData): Promise<UpdateGameDataFormState> {
    const validateFields = gameDataSchema.safeParse({
        gameName: formData.get("gameName"),
        description: formData.get("description"),
        instruction: formData.get("instruction"),
        gameImage: formData.get("gameImage")
    })


    if(!validateFields.success) {
        const errors = validateFields.error.flatten().fieldErrors
        console.log(errors);

        return {
            errors: errors,
            message: "Invalid Form."
        }
    } else {
        return {
            errors: undefined,
            message: "Success"
        }
    }
}