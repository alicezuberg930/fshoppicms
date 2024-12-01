import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './app/configs/auth.config'
import { PATH } from './app/common/path'
import { getToken } from 'next-auth/jwt'

// export { auth as middleware } from "@/app/configs/auth.config"

// export default auth((req) => {
//     if (!req.auth && req.nextUrl.pathname !== "/login") {
//         const newUrl = new URL("/login", req.nextUrl.origin)
//         return Response.redirect(newUrl)
//     }
// })

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log("im in middleware");
    
    const session = await getToken({ req: request, secret: process.env.AUTH_SECRET })
    const path = request.nextUrl.pathname;
    if (!path.startsWith(PATH.LOGIN)) {
        return NextResponse.redirect(new URL(PATH.LOGIN, request.url))
    } else if (path.startsWith(PATH.LOGIN)) {
        return NextResponse.redirect(new URL(PATH.CATEGORIES, request.url))
    }
    return NextResponse.redirect(new URL(PATH.CATEGORIES, request.url))
}

// See "Matching Paths" below to learn more

export const config = {
    matcher: [
        // "/login",
        // "/cms/:path*"
        // '/((?!auth).*)(.+)|/login',
        // "/((?!api|_next/static|_next/image|favicon.ico|/|/auth).*)",
        // '/((?!api|_next/static|_next/image|favicon.ico|auth|$).*)',
    ]
}
