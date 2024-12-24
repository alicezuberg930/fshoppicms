import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getProfile, login } from "../services/api.service";
import { AuthError } from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                phone: {},
                password: {}
            },
            authorize: async (credentials) => {
                try {
                    const signin = await login(credentials.phone as string, credentials.password as string)
                    if (signin?.login != null) {
                        const profile = await getProfile(signin.login.token)
                        if (profile?.data?.data != null) {
                            profile.data.data["access_token"] = signin.login.token
                            return profile.data.data as User
                        } else {
                            throw new CustomError("Access token không hợp lệ")
                        }
                    } else {
                        throw new CustomError("Sai thông tin đăng nhập")
                    }
                } catch (error) {
                    throw new CustomError("Sai thông tin đăng nhập")
                }
            },
        })
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        maxAge: 24 * 60 * 60,
        strategy: 'jwt',
    },
    pages: {
        signIn: "/",
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