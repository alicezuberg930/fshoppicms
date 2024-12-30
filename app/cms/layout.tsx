import type { Metadata } from "next"
import AdminSideBar from "../components/AdminSideBar"
import AdminHeader from "../components/AdminHeader"
import AdminContent from "../components/AdminContent"
import { auth } from "../configs/auth.config"
import CustomQueryClientProvider from "../components/CustomQueryClientProvider"
import LoadingOverlay from "../components/LoadingOverlay"

export const metadata: Metadata = {
    title: "Future Life | CMS",
    description: "Phần quản lý content của website CMS",
}

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const session = await auth()

    return (
        <CustomQueryClientProvider>
            <div className='flex h-screen'>
                <AdminSideBar />
                <div className='flex flex-col flex-1 w-full bg-white'>
                    <AdminHeader session={session} />
                    <AdminContent>
                        {children}
                    </AdminContent>
                </div>
            </div>
            <LoadingOverlay />
        </CustomQueryClientProvider>
    )
}

export default RootLayout