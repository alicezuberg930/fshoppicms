"use server"

import { signIn, signOut } from "@/app/configs/auth.config"

export const login = async (phone: string, password: string) => {
    try {
        return await signIn("credentials", { phone, password, redirect: false })
    } catch (error: any) {
        return { error: error.type }
    }
}

export const logout = async () => {
    await signOut({ redirectTo: "/login" })
}   