'use client'

import {
    PhotoIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useFormState } from 'react-dom';
import { User } from '@/app/lib/definition';
import { ChangeEvent, FormEvent, useState, MouseEvent } from 'react';
import { editUser, toggleUserActivation, UserEditFormState } from '@/app/lib/action';

export default function UserEditForm({
    data
}: {
    data: User
}) {
    const initialState: UserEditFormState = { message: null, errors: {} }
    const [state, formAction] = useFormState(editUser, initialState)

    const [avatar, setAvatar] = useState<File | string | null>(data.avatar)
    const [name, setName] = useState<string>(data.name)
    const [username, setUsername] = useState<string>(data.username)
    const [email, setEmail] = useState<string>(data.email)
    const [phone, setPhone] = useState<string>(data.phone)
    const [role, setRole] = useState<string>(data.role)
    const [dob, setDob] = useState<string | undefined>(data.dob)
    const [gender, setGender] = useState<string | undefined>(data.gender)

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            setAvatar(event.target.files[0])
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        
        const formData = new FormData()
        formData.append('id', data.id)
        if(avatar) formData.append('avatar', avatar)
        formData.append('name', name)
        formData.append('username', username)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('role', role)
        if(dob) formData.append('dob', dob)
        if(gender) formData.append('gender', gender)  

        formAction(formData)
    }

    const handleToggleActivation = async (event: MouseEvent<HTMLButtonElement>, userId: string) => {
        toggleUserActivation(userId)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full px-6 grid grid-cols-1 divide-y-2 divide-gray-300 lg:py-6 lg:px-0 lg:divide-y-0 lg:divide-x-2 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] bg-white rounded-md shadow-md">
            <div className="flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                <div className="flex gap-x-2 text-gray-950">
                    <InformationCircleIcon className="w-5"/>
                    <h2 className="font-semibold">User Information</h2>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="avatar" className={ clsx(
                        "overflow-hidden flex cursor-pointer w-full aspect-video rounded-md",
                        {
                            "relative flex-col gap-y-4 items-center justify-center border-2 border-dashed text-violet-500 border-violet-500 hover:border-violet-800 hover:text-violet-800 transition-colors duration-300": !avatar
                        }
                    )}>
                        {avatar ? (
                            typeof avatar  === 'string' ? (
                                avatar !== '' ? (
                                    <img src={avatar} alt="Image Preview" className="w-full h-full object-cover"/>
                                ) : (
                                    <>
                                        <div className="absolute inset-4 border-2 border-violet-500 rounded-md hover:border-violet-800 transition-colors duration-300"></div>
                                        <PhotoIcon className="w-16"/>
                                        <p className="text-sm font-semibold">Choose your game's poster</p>
                                    </>
                                )
                            ) : (
                                <img src={URL.createObjectURL(avatar)} alt="Image Preview" className="w-full h-full object-cover"/>
                            )
                        ) : (
                            <>
                                <div className="absolute inset-4 border-2 border-violet-500 rounded-md hover:border-violet-800 transition-colors duration-300"></div>
                                <PhotoIcon className="w-16"/>
                                <p className="text-sm font-semibold">Choose your game's poster</p>
                            </>
                        )}
                        <input id="avatar" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleImageChange}/>
                    </label>
                    {state.errors?.avatar && state.errors.avatar.map((error: string) => (
                        <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                    ))}
                </div>
                <div className="relative mt-2 flex flex-col">
                    <input type="text" id="id" value={data.id} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 disabled:bg-gray-100 disabled:rounded-sm disabled:cursor-not-allowed transition-colors duration-300 peer" placeholder=" " required disabled/>
                    <label htmlFor="id" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 peer-disabled:bg-white peer-disabled:px-2 peer-disabled:rounded-full duration-300">User ID</label>                 
                </div>
                <div className="relative mt-2 flex flex-col">
                    <input type="text" id="name" value={name} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor="name" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Name</label>
                    {state.errors?.name && state.errors.name.map((error: string) => (
                        <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                    ))}
                </div>
                <div className="relative mt-2 flex flex-col">
                    <input type="text" id="username" value={username} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="username" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Username</label>
                    {state.errors?.username && state.errors.username.map((error: string) => (
                        <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                    ))}
                </div>
                <div className="relative mt-2 flex flex-col">
                    <input type="email" id="email" value={email} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="email" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Email</label>
                    {state.errors?.email && state.errors.email.map((error: string) => (
                        <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                    ))}
                </div>
                <div className="relative mt-2 flex flex-col">
                    <input type="tel" id="phone" value={phone} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setPhone(e.target.value)}/>
                    <label htmlFor="phone" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Phone number</label>
                    {state.errors?.phone && state.errors.phone.map((error: string) => (
                        <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                    ))}
                </div>
                <div className="flex gap-x-4 mt-2">
                    <div className="relative w-1/2 flex flex-col">
                        <input type="date" id="dob" value={dob} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setDob(e.target.value)}/>
                        <label htmlFor="dob" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Date of birth</label>
                        {state.errors?.dob && state.errors.dob.map((error: string) => (
                            <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                        ))}
                    </div>
                    <div className="relative w-1/2 flex flex-col">
                        <select id="gender" value={gender} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" required onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select a gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <label htmlFor="gender" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:text-violet-800 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Gender</label>
                        {state.errors?.gender && state.errors.gender.map((error: string) => (
                            <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                        ))}
                    </div>
                </div>
                <div className="relative mt-2 flex flex-col">
                    <select id="role" value={role} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" required onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select a role</option>
                        <option value="user">User</option>
                        <option value="brand">Brand</option>
                        <option value="admin">Admin</option>
                    </select>
                    <label htmlFor="role" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:text-violet-800 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Role</label>
                    {state.errors?.role && state.errors.role.map((error: string) => (
                        <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                    ))}
                </div>
            </div>
            <div className="relative w-full h-full">
                <div className="sticky top-0 flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                    <button type="button" className={clsx(
                        "w-full text-violet-50 text-sm font-bold py-4 px-2 rounded-md transition-colors duration-300",
                        {
                            "bg-green-500 hover:bg-green-700": data.status === "inactive",
                            "bg-red-500 hover:bg-red-700": data.status === "active"
                        }
                    )} onClick={(event) => handleToggleActivation(event, data.id)}>
                        {data.status === "active" ? "Deactivate this account" : "Activate this account" }
                    </button>
                    <button type="submit" className="w-full text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300">Update</button>
                    <div className="flex flex-col">
                        {state.message && (
                            <p className="text-xs text-red-700">{state.message}</p>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}