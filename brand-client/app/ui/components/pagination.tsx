'use client'

import {
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: any }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex justify-end items-center">
            <PaginationArrow direction="previous" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1}/>
            <div className="flex h-10 w-16 justify-center items-center bg-white border border-x-0 border-gray-300">
                <span className="text-gray-950 text-sm">{`${currentPage} / ${totalPages}`}</span>
            </div>
            <PaginationArrow direction="next" href={createPageURL(currentPage + 1)} isDisabled={currentPage >= totalPages}/>
        </div>
    )
}

function PaginationArrow({
    href,
    direction,
    isDisabled
}: {
    href: string,
    direction: 'next' | 'previous',
    isDisabled?: boolean
}) {
    const className = clsx(
        "flex justify-center items-center h-10 w-10 text-violet-50 transition-colors duration-300",
        {
            'bg-gray-500 pointer-events-none text-gray-300': isDisabled,
            'bg-gray-950 hover:bg-violet-800': !isDisabled,
            "rounded-s-md": direction === 'previous',
            "rounded-e-md": direction === 'next'
        }
    )

    const icon = direction === 'previous' ? (
        <ChevronLeftIcon className="w-5"/>
    ) : (
        <ChevronRightIcon className="w-5"/>
    )

    return isDisabled ? (
        <div className={className}>
            {icon}
        </div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    )
}