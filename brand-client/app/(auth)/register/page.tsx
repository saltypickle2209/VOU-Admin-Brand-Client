import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Register',
};

export default function Page() {
    return (
        <main className="flex min-h-screen p-0 bg-violet-900 justify-center items-start sm:p-8 md:px-16 md:py-16 md:items-center lg:px-32">
            <div className="flex flex-col-reverse rounded-2xl bg-white shadow-lg shadow-violet-950 w-full h-auto p-8 md:flex-row-reverse">
                <div className="flex flex-col rounded-2xl w-full overflow-auto shrink-0 md:w-2/5 relative">
                    <div className="w-full grow absolute inset-0 md:relative">
                        <Image src="/auth_hero_image.png" fill={true} alt="Hero Image" className="object-cover"/>
                    </div>
                    <div className="flex h-24 bg-violet-400 justify-center items-center rounded-2xl m-4 p-8 z-10 md:h-32 md:m-0 md:rounded-none">
                        <p className="text-xl font-extrabold text-center text-gray-950 lg:text-2xl">Create your own events</p>
                    </div>
                </div>
                <div className="flex flex-col grow gap-8 px-0 pt-0 pb-8 md:px-16 md:pt-8">
                    <Image src="/vou_large_icon.png" width={86} height={32} alt="App Icon"/>
                    <div className="flex flex-col">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950">Get Started</h1>
                        <p className="text-sm text-gray-500 mt-2">
                            Already have an account? {' '}
                            <Link href='/login' className="text-gray-950 font-bold hover:text-violet-800 transition-colors duration-300">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form className="flex flex-col gap-8">
                        <div className="relative z-0 w-full">
                            <input id="name" type="text" className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" "/>
                            <label htmlFor="name" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>

                        <div className="relative z-0 w-full">
                            <input id="domain" type="text" className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" "/>
                            <label htmlFor="domain" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Domain</label>
                        </div>

                        <div className="relative z-0 w-full">
                            <input id="address" type="text" className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" "/>
                            <label htmlFor="address" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                        </div>

                        <div className='grid grid-cols-2 gap-8'>
                            <div className="relative z-0 w-full">
                                <input id="latitude" type="text" className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" "/>
                                <label htmlFor="latitude" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Latitude</label>
                            </div>
                            <div className="relative z-0 w-full">
                                <input id="longitude" type="text" className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" "/>
                                <label htmlFor="longitude" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Longitude</label>
                            </div>
                        </div>

                        <div className="relative z-0 w-full">
                            <input id="username" type="text" className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" "/>
                            <label htmlFor="username" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                        </div>
                        
                        <div className="relative z-0 w-full">
                            <input id="email" type="email" className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" "/>
                            <label htmlFor="email" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>

                        <div className="relative z-0 w-full">
                            <input id="password" type="password" className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" "/>
                            <label htmlFor="password" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>

                        <div className="relative z-0 w-full">
                            <input id="confirm_password" type="password" className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" "/>
                            <label htmlFor="confirm_password" className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                        </div>
                        
                        <button type="submit" className="w-full rounded-lg py-3 bg-gray-950 text-violet-50 font-bold hover:bg-violet-800 transition-colors duration-300">Log In</button>
                    </form>

                    <p className="text-sm text-center text-gray-500">
                        By signing up, I agree to the {' '}
                        <a href='/' className="underline hover:text-violet-800 transition-colors duration-300">
                            Terms of Pickle
                        </a>
                        {' '} and {' '}
                        <a href='/' className="underline hover:text-violet-800 transition-colors duration-300">
                            Pickle Policy
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}