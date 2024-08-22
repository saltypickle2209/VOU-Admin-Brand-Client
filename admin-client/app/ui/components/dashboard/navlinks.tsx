'use client'

import {
    RectangleGroupIcon,
    UserGroupIcon,
    WrenchScrewdriverIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Dashboard', href: '/dashboard', icon: RectangleGroupIcon },
    { name: 'Users', href: '/events', icon: UserGroupIcon },
    { name: 'Game config', href: '/gamedata', icon: WrenchScrewdriverIcon }
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon
                return (
                    <Link key={link.name} href={link.href}
                        className={clsx(
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm text-gray-950 font-medium hover:bg-violet-100 hover:text-violet-800 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors duration-300",
                            {
                                'bg-violet-100 text-violet-800': pathname === link.href,
                            },
                        )}>
                            <LinkIcon className="w-6 md:w-5"/>
                            <p className="hidden md:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}