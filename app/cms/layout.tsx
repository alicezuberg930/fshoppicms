import type { Metadata } from "next"
import AdminSideBar from "../components/AdminSideBar"
import AdminHeader from "../components/AdminHeader"
import AdminContent from "../components/AdminContent"
import { auth } from "../configs/auth.config"
import CustomQueryClientProvider from "../components/CustomQueryClientProvider"

export const metadata: Metadata = {
    title: "Fshoppi | Trang CMS",
    description: "Phần quản lý content của website",
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
        </CustomQueryClientProvider>
    )
}

export default RootLayout