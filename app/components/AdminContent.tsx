'use client'

import React from "react";

const AdminContent = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main className="bg-[#f6f6f6] h-full overflow-y-auto">
            <div className="w-full mx-auto">
                {children}
            </div>
        </main>
    )
}

export default AdminContent