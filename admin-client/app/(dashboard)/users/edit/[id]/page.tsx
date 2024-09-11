import { baseURL, User } from "@/app/lib/definition";
import { getToken } from "@/app/lib/server_utility";
import BrandEditForm from "@/app/ui/components/users/brand_edit_form";
import UserEditForm from "@/app/ui/components/users/user_edit_form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update A User',
};

//remember to add props
export default async function Page({ params }: { params: { id: string }}){
    const id = params.id
    let data: any = null

    try{
        const response = await fetch(`${baseURL}/auth/users/detail/${id}`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            } 
        })
        if(response.status === 404){
            throw new Error("404")
        }
        if(!response.ok){
            throw new Error("Something went wrong")
        }
        data = await response.json()
    }
    catch (error: any){
        if(error.message === "404"){
            notFound()
        }
        else{
            throw error
        }
    }

    console.log(data)

    //fectch event's game's info

    const userData: User = {
        id: data.id,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        name: data.name,
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone,
        // change this to "user"/"admin" or "brand"
        role: data.role,
        status: data.status,
        dob: "2000-01-01",
        gender: "female",
        domain: "e-Commerce",
        address: "Somewhere in the Earth",
        latitude: "80.002",
        longitude: "102.052"
    }

    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">✏️ Edit your user</h1>
            <p className="text-sm text-gray-500 hidden md:block">Make changes and submit the form below to update this user</p>
            {(userData.role === "user" || userData.role === "admin") ?
                <UserEditForm data={userData}/> :
                <UserEditForm data={userData}/>
            }
        </main>
    )
}