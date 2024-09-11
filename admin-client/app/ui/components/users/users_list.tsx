import Link from "next/link";
import {
    PencilSquareIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { User } from "@/app/lib/definition";
import clsx from 'clsx';
import DeleteUserButton from "./delete_user_button";

const data: User[] = [
    {
        id: "1",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        name: "Pickle",
        username: "pickle",
        password: "123123",
        email: "pickle@mail.com",
        phone: "0123456789",
        role: "admin",
        status: "active"
    },
    {
        id: "2",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        name: "Meo meo",
        username: "meomeo",
        password: "123123",
        email: "meomeo@mail.com",
        phone: "0123456789",
        role: "user",
        status: "active"
    },
    {
        id: "3",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        name: "User",
        username: "user",
        password: "123123",
        email: "user@mail.com",
        phone: "0123456789",
        role: "user",
        status: "inactive"
    },
    {
        id: "4",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        name: "Brand 1",
        username: "brand1",
        password: "123123",
        email: "brand1@mail.com",
        phone: "0123456789",
        role: "brand",
        status: "inactive"
    },
    {
        id: "5",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        name: "Brand 2",
        username: "brand2",
        password: "123123",
        email: "brand2@mail.com",
        phone: "0123456789",
        role: "brand",
        status: "active"
    },
]

export default function UsersList({ data }: { data: any }){
    // fetch data using query & currentPage
    
    return (
        <div className="flex flex-col divide-y-2 divide-gray-300">
            <div className="hidden items-center md:grid md:grid-cols-9">
                <div className="col-span-4 p-4 pr-2 flex">
                    <span className="text-sm text-gray-950 font-semibold">Name</span>
                </div>
                <div className="col-span-2 px-2 py-4 flex justify-center">
                    <span className="text-sm text-gray-950 font-semibold">Role</span>
                </div>
                <div className="col-span-2 px-2 py-4 flex justify-center">
                    <span className="text-sm text-gray-950 font-semibold">Status</span>
                </div>
                <div className="pl-2 py-4 pr-4 flex justify-end">
                    <span className="text-sm text-gray-950 font-semibold">Action</span>
                </div>
            </div>

            {data.data.map((user: any) => {
                return (
                    <div key={user.id} className="bg-white p-4 grid grid-cols-4 grid-flow-row-dense items-center md:grid-cols-9 gap-y-4">
                        <div className="col-span-3 flex items-center gap-x-2 pr-2 md:col-span-4">
                            <div className="w-12 h-12 rounded-full bg-slate-50 shrink-0 overflow-hidden">
                                <img src={user.avatar} alt="" className="object-cover w-full h-full"/>
                            </div>
                            <div className="flex flex-col gap-y-1 overflow-hidden">
                                <span className="text-sm text-gray-950 font-semibold truncate">{user.name}</span>
                                <span className="text-xs text-gray-500 truncate">{user.email}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center pr-2 md:pl-2 col-span-2">
                            <div className={clsx(
                                "flex items-center justify-center text-xs text-white font-bold py-2 w-full rounded-md md:w-16 lg:w-24",
                                {
                                    "bg-gray-950": user.role === "user",
                                    "bg-amber-500": user.role === "brand",
                                    "bg-violet-700": user.role === "admin"
                                }
                            )}>
                                {user.role === "user" ? "User" : user.role === "brand" ? "Brand" : "Admin"}    
                            </div>
                        </div>
                        <div className="flex items-center justify-center pl-2 md:pr-2 col-span-2">
                            <div className={clsx(
                                "flex items-center justify-center text-xs text-white font-bold py-2 w-full rounded-md md:w-16 lg:w-24",
                                {
                                    "bg-green-700": user.status === "active",
                                    "bg-red-700": user.status === "inactive"
                                }
                            )}>
                                {user.status === "active" ? "Active" : "Inactive"}
                            </div>
                        </div>
                        <div className="flex gap-x-4 justify-end items-center pl-2 col-span-1 md:gap-x-2 lg:gap-x-4">
                            <Link href={`/users/edit/${user.id}`} className="text-gray-950 hover:text-violet-800 transition-colors duration-300">
                                <PencilSquareIcon className="w-5"/>
                            </Link>
                            <DeleteUserButton userId={user.id} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}