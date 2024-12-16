'use client'
import { useState } from "react"
import { icons } from '@/app/common/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setCollapseSidebar } from "../services/sidebar.slice"
import { Session } from "next-auth"
import Link from "next/link"
import { PATH } from "@/app/common/path"
import { logout } from "../services/auth.service"
import Image from "next/image"

const AdminHeader: React.FC<{ session: Session | null }> = ({ session }) => {
    const { FaChevronDown, CiBellOn, MdLogout, FaUser, FaBars } = icons
    const { isCollapsed } = useSelector((state: any) => state.sidebar)
    const dispatch = useDispatch()

    const toggleSubmenu = () => {
        const subMenu = document.querySelector(".submenu")
        subMenu?.classList?.toggle("hidden")
    }

    return (
        <header className="z-10 py-4 bg-white shadow-md">
            <div className="container flex items-center justify-between h-full px-6 mx-auto">
                <button className="rounded-md focus:outline-none text-blue-300"
                    onClick={() => { dispatch(setCollapseSidebar(!isCollapsed)) }}
                >
                    <FaBars className="w-5 h-5" />
                </button>
                <div className="flex items-center flex-shrink-0 space-x-6">
                    <div className="relative">
                        <div className="flex items-center gap-5">
                            <div>
                                <div className="relative inline-block w-full">
                                    <select className="block w-full p-1 border border-blue-300 rounded text-blue-300" name="locale" id="locale">
                                        <option value="en">English</option>
                                        <option value="vi">Vietnamese</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={() => { }}>
                                <CiBellOn className='w-5 h-5' />
                            </button>
                            <button className="text-gray-500 flex items-center gap-2 focus:outline-none" onClick={toggleSubmenu}>
                                <Image width={32} height={32} className="object-cover rounded-full" src='/assets/user.png' alt="profile" />
                                <p className="hidden md:block">{session?.user.name ?? ""}</p>
                                <FaChevronDown className="w-5 h-5" />
                            </button>
                        </div>
                        <div>
                            <div className={`submenu hidden absolute right-0 mt-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md`}>
                                <div className="flex">
                                    <Link href={PATH.PROFILE} className="flex items-center gap-3 px-6 py-3 text-sm font-semibold rounded-md hover:bg-gray-200 w-full">
                                        <FaUser className="w-4 h-4" />
                                        <span>Hồ sơ</span>
                                    </Link>
                                </div>
                                <button className="flex" onClick={async () => { await logout() }}>
                                    <div className="flex items-center gap-3 px-6 py-3 text-sm font-semibold rounded-md hover:bg-gray-200">
                                        <MdLogout className="w-4 h-4" />
                                        <span>Đăng xuất</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default AdminHeader