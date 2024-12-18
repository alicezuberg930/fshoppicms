"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"

const CustomQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 10000 * 60 } } }))

    return (
        <QueryClientProvider client={queryClient} >
            <ReactQueryStreamedHydration>
                {children}
            </ReactQueryStreamedHydration>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default CustomQueryClientProvider