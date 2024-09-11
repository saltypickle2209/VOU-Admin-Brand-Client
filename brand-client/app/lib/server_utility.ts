import { cookies } from "next/headers"

export function getToken(): string {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    return token || ""
}