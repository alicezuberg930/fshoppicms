
"use client"
import { SessionProvider, useSession } from "next-auth/react";

const NextAuthSessionProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default NextAuthSessionProvider
