'use client'

import React from "react";

const Content = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="h-full overflow-y-auto">
            <div className="w-full py-3 mx-auto">
                {children}
            </div>
        </main>
    )
}

export default Content