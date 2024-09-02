import { NextResponse, NextRequest } from 'next/server'
import { cookies } from "next/headers"

export function middleware(request: NextRequest) {
    console.log("middleware")
    const pathName = request.nextUrl.pathname
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    if (pathName === '/')
        return NextResponse.redirect(new URL('/dashboard', request.url))
    if ((pathName.startsWith('/login') || pathName.startsWith('/register')) && token)
        return NextResponse.redirect(new URL('/dashboard', request.url))
    if((pathName.startsWith('/dashboard') || pathName.startsWith('/events') || pathName.startsWith('/games') || pathName.startsWith('/vouchers')) && !token)
        return NextResponse.redirect(new URL('/login', request.url))

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/dashboard/:path*',
        '/events/:path*',
        '/games/:path*',
        '/vouchers/:path*',
    ],
}