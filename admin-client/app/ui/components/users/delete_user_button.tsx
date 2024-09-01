'use client'

import { deleteUser } from "@/app/lib/action"
import {
    TrashIcon
} from '@heroicons/react/24/outline';

export default function DeleteUserButton({ userId }: { userId: string }){
    const deleteUserWithId = deleteUser.bind(null, userId)

    return (
        <form action={deleteUserWithId} className="flex">
            <button type="submit" className="text-gray-950 hover:text-red-700 transition-colors duration-300">
                <TrashIcon className="w-5"/>
            </button>
        </form>
    )
}