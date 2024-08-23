import { User } from "@/app/lib/definition";
import UserEditForm from "@/app/ui/components/users/user_edit_form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update A User',
};

//remember to add props
export default function Page({ params }: { params: { id: string }}){
    const id = params.id
    // fetch event info

    // check existence
    // if(!data) {
    //     notFound()
    // }

    //fectch event's game's info

    const dummyUser: User = {
        id: "1",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        name: "Something",
        username: "something",
        password: "123456789",
        email: "something@mail.com",
        phone: "0123456789",
        role: "admin",
        status: "active",
        dob: "2000-01-01",
        gender: "male"
    }

    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">✏️ Edit your user</h1>
            <p className="text-sm text-gray-500 hidden md:block">Make changes and submit the form below to update this user</p>
            {(dummyUser.role === "user" || dummyUser.role === "admin") &&
                <UserEditForm data={dummyUser}/>
            }
        </main>
    )
}