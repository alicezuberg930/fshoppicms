import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getProfile, login } from "../services/api";
import { AuthError } from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                phone: {},
                password: {}
            },
            authorize: async (credentials) => {
                const tokenResponse = await login(credentials.phone as string, credentials.password as string)
                if (tokenResponse.token != null) {
                    const response = await getProfile(tokenResponse.token)
                    if (response.data != null) {
                        response.data["access_token"] = tokenResponse.token
                        return response.data as User
                    } else {
                        throw new CustomError("Access token không hợp lệ")
                    }
                } else {
                    throw new CustomError("Sai thông tin đăng nhập")
                }
            }
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.user = (user as User)
            }
            return token
        },
        session({ session, token }) {
            (session.user as User) = token.user
            return session
        },
        authorized: async ({ auth }) => {
            return !auth
        },
    }
})

export class CustomError extends AuthError {
    static type: string
    static message: string

    constructor(message: any) {
        super()
        this.type = message
    }
}