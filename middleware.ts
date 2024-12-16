import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './app/configs/auth.config'
import { PATH } from "@/app/common/path"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = await auth()
    const isAuthenticated = !!session?.user
    const path = request.nextUrl.pathname
    
    if (isAuthenticated && path === PATH.LOGIN) {
        return NextResponse.redirect(new URL(PATH.CATEGORIES, request.url))
    } else if (!isAuthenticated && path.startsWith("/cms")) {
        return NextResponse.redirect(new URL(PATH.LOGIN, request.url))
    } else if (isAuthenticated && !session.user.isAdmin && path.startsWith(PATH.USERS)) {
        // redirect user to the previous page if their role is not admin
        // Use the Referer header to get the previous URL
        const referer = request.headers.get('referer') || PATH.LOGIN // Default to '/login' if no Referer header
        return NextResponse.redirect(new URL(referer, request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/cms/:path*"
    ]
}




// '/((?!auth).*)(.+)|/login',
// "/((?!api|_next/static|_next/image|favicon.ico|/|/auth).*)",
// '/((?!api|_next/static|_next/image|favicon.ico|auth|$).*)',