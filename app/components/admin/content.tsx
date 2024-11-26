'use client'

import React from "react";

const Content = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main className="h-full overflow-y-auto">
            <div className="w-full mx-auto">
                {children}
            </div>
        </main>
    )
}

export default Content