'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {z} from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg'];

const voucherSchema = z.object({
    voucherName: z.string().min(1, {message: "Voucher's name cannot be empty"}),
    // image: z.instanceof(File, {
    //     message: "File must be JPG of JPEG"
    // }).refine(file => {
    //     return ACCEPTED_FILE_TYPES.includes(file.type);
    // }, {
    //     message: "File must be JPG of JPEG"
    // }), 
    value: z.preprocess((value) => parseFloat(value as string), z.number({message: "Voucher's value must be a number"}).min(0, {message: "Voucherr's value must be a positive number"})),
    description: z.string().min(1, {message: "Voucher's description cannot be empty"})
})

export async function revalidateDashboard() {
    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function revalidateVouchers() {
    revalidatePath('/vouchers');
    redirect('/vouchers');
}

export async function createVoucher(prevState: any, formData: FormData) {
    const voucherName = formData.get("voucherName");
    const image = formData.get("image");
    const value = formData.get("value");
    const description = formData.get("description");

    const validatedFields = voucherSchema.safeParse({
        voucherName,
        image,
        value,
        description,
    });
    
    if(!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors;
        console.error("Validation errors:", errors);
        return {
            message: "error",
            errors: {
                voucherName: errors['voucherName']?.[0] ? `(*)${errors['voucherName']?.[0]}` : '',
                // image: errors['image']?.[0] ? `(*)${errors['image']?.[0]}` : '',
                image: "",
                value: errors['value']?.[0] ? `(*)${errors['value']?.[0]}` : '',
                description: errors['description']?.[0] ? `(*)${errors['description']?.[0]}` : '',
            },
            fieldValues: {
                voucherName,
                image,
                value,
                description
            }
        };
    }

    return {
        message: "success",
        errors: undefined,
        fieldValues: {
          voucherName: "",
          image: "",
          value: "",
          description: "",
        },
    }
}

