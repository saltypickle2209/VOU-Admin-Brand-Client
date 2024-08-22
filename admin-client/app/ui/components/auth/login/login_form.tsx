'use client'

import { FormEvent, useState } from "react"
import { useFormState } from 'react-dom';
import { logIn, LoginFormState } from '@/app/lib/action';

export default function LoginForm(){
    const initialState: LoginFormState = { message: null, errors: {} }
    const [state, formAction] = useFormState(logIn, initialState)

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        
        formAction(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative z-0 w-full flex flex-col">
                <input id="username" type="text" value={username} className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="username" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                {state.errors?.username && state.errors.username.map((error: string) => (
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
                  
            <button type="submit" className="w-full rounded-lg py-3 bg-gray-950 text-violet-50 font-bold hover:bg-violet-800 transition-colors duration-300">Log In</button>
            {state.message && (
                <p className="text-xs text-red-700">{state.message}</p>
            )}
        </form>
    )
}