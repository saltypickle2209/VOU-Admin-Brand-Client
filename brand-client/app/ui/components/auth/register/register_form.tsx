'use client'

import { FormEvent, useState } from "react"
import { useFormState } from 'react-dom';
import { register, RegisterFormState } from '@/app/lib/action';

export default function RegisterForm() {
    const initialState: RegisterFormState = { message: null, errors: {} }
    const [state, formAction] = useFormState(register, initialState)

    const [name, setName] = useState<string>('')
    const [domain, setDomain] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [latitude, setLatitude] = useState<string>('')
    const [longitude, setLongitude] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData()
        formData.append('name', name)
        formData.append('domain', domain)
        formData.append('address', address)
        formData.append('latitude', latitude)
        formData.append('longitude', longitude)
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)
        
        formAction(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative z-0 w-full flex flex-col">
                <input id="name" type="text" value={name} className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="name" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                {state.errors?.name && state.errors.name.map((error: string) => (
                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                ))}
            </div>

            <div className="relative z-0 w-full flex flex-col">
                <input id="domain" type="text" value={domain} className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setDomain(e.target.value)}/>
                <label htmlFor="domain" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Domain</label>
                {state.errors?.domain && state.errors.domain.map((error: string) => (
                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                ))}
            </div>

            <div className="relative z-0 w-full flex flex-col">
                <input id="address" type="text" value={address} className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setAddress(e.target.value)}/>
                <label htmlFor="address" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                {state.errors?.address && state.errors.address.map((error: string) => (
                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                ))}
            </div>

            <div className='grid grid-cols-2 gap-8'>
                <div className="relative z-0 w-full flex flex-col">
                    <input id="latitude" type="number" value={latitude} className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setLatitude(e.target.value)}/>
                    <label htmlFor="latitude" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Latitude</label>
                    {state.errors?.latitude && state.errors.latitude.map((error: string) => (
                        <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                    ))}
                </div>
                <div className="relative z-0 w-full flex flex-col">
                    <input id="longitude" type="number" value={longitude} className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setLongitude(e.target.value)}/>
                    <label htmlFor="longitude" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Longitude</label>
                    {state.errors?.longitude && state.errors.longitude.map((error: string) => (
                        <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                    ))}
                </div>
            </div>

            <div className="relative z-0 w-full flex flex-col">
                <input id="username" type="text" value={username} className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="username" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                {state.errors?.username && state.errors.username.map((error: string) => (
                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                ))}
            </div>
                        
            <div className="relative z-0 w-full flex flex-col">
                <input id="email" type="email" value={email} className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="email" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                {state.errors?.email && state.errors.email.map((error: string) => (
                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                ))}
            </div>

            <div className="relative z-0 w-full flex flex-col">
                <input id="password" type="password" value={password} className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="password" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                {state.errors?.password && state.errors.password.map((error: string) => (
                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                ))}
            </div>

            <div className="relative z-0 w-full flex flex-col">
                <input id="confirm_password" type="password" value={confirmPassword} className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setConfirmPassword(e.target.value)}/>
                <label htmlFor="confirm_password" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                {state.errors?.confirmPassword && state.errors.confirmPassword.map((error: string) => (
                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                ))}
            </div>
                        
            <button type="submit" className="w-full rounded-lg py-3 bg-gray-950 text-violet-50 font-bold hover:bg-violet-800 transition-colors duration-300">Register</button>
            {state.message && (
                <p className="text-xs text-red-700">{state.message}</p>
            )}
        </form>
    )
}