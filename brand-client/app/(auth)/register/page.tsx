import RegisterForm from '@/app/ui/components/auth/register/register_form';
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
                <div className="flex flex-col grow gap-8 px-0 pt-0 pb-8 md:pl-8 md:pr-16 md:pt-8">
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

                    <RegisterForm/>

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