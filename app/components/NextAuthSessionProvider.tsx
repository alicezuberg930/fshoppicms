
"use client"
import { SessionProvider } from "next-auth/react";
import { Session } from "@auth/core/types"

const NextAuthSessionProvider: React.FC<{ children: React.ReactNode, session: Session | null }> = ({ children, session }) => {

    return (
        <SessionProvider session={session}>{children}</SessionProvider>
    )
}

export default NextAuthSessionProvider
