'use client'
import React, { useContext, useState } from 'react';
import { AdminContext } from "@/app/hooks/admin.context";
import Link from 'next/link'
import { icons } from '@/app/common/icons';

const SideBar: React.FC = () => {
    const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;
    const {
        MdCancel, FaUser, FaBox, SiChatbot, FaChevronDown, MdLogout,
        TbLayoutDashboard, CiShoppingBasket, PiShippingContainer, VscSettings
    } = icons
    const [paymentsDropDown, setPaymentsDropDown] = useState<boolean>(false)
    const [configDropDown, setConfigDropDown] = useState<boolean>(false)

    return (
        <aside className={collapseMenu ? "hidden" : "hidden lg:block z-20 flex-shrink-0 w-[270px] p-2 overflow-y-auto text-center bg-gray-800 h-full"}>
            <div className="text-gray-100 text-xl">
                <div className="p-2.5 mt-1 flex items-center justify-between">
                    <div className="flex items-center">
                        <img srcSet='/logo.svg' className='w-12' />
                        <h1 className="font-bold text-gray-200 text-sm ml-3">FShoppii</h1>
                    </div>
                    <MdCancel className="w-5 h-5" onClick={() => {
                        setCollapseMenu(!collapseMenu)
                        console.log(collapseMenu);

                    }} />
                </div>
                <div className="my-2 bg-gray-600 h-[1px]"></div>
            </div>
            {/*  */}
            <Link className="p-2.5 mt-3 flex items-center rounded-md px-4 cursor-pointer hover:bg-blue-600 text-white" href={"/cms/dashboard"}>
                <TbLayoutDashboard className="w-5 h-5" />
                <span className="text-[15px] ml-4 text-gray-200">Dashboard</span>
            </Link>
            {/*  */}
            <Link className="p-2.5 mt-3 flex items-center rounded-md px-4 cursor-pointer hover:bg-blue-600 text-white" href={"/cms/orders"}>
                <CiShoppingBasket className="w-5 h-5" />
                <span className="text-[15px] ml-4 text-gray-200">Đơn hàng</span>
            </Link>
            {/*  */}
            <Link className="p-2.5 mt-3 flex items-center rounded-md px-4 cursor-pointer hover:bg-blue-600 text-white" href={"/cms/customers"}>
                <FaUser className="w-5 h-5" />
                <span className="text-[15px] ml-4 text-gray-200">Khách hàng</span>
            </Link>
            {/*  */}
            <Link className="p-2.5 mt-3 flex items-center rounded-md px-4 cursor-pointer hover:bg-blue-600 text-white" href={"/cms/shippings"}>
                <PiShippingContainer className="w-5 h-5" />
                <span className="text-[15px] ml-4 text-gray-200">Giao hàng</span>
            </Link>
            {/*  */}
            <div className='mt-3 text-white'>
                <Link className="p-2.5 flex items-center rounded-md px-4 cursor-pointer hover:bg-blue-600" href={"/cms/payments"}
                    onClick={() => setPaymentsDropDown(!paymentsDropDown)}
                >
                    <FaBox className="w-5 h-5" />
                    <div className="flex justify-between w-full items-center">
                        <span className="text-[15px] ml-4 text-gray-200">Thanh toán</span>
                        <span className="text-sm" id="arrow">
                            <FaChevronDown className="w-5 h-5" />
                        </span>
                    </div>
                </Link>
                <div className={`${paymentsDropDown ? '' : 'hidden'} text-left text-sm mt-2 mx-auto text-gray-200`} id="submenu">
                    <Link className="cursor-pointer py-2 px-4 hover:bg-blue-600 rounded-md mt-1 flex items-center" href={"/cms/payments/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                    <Link className="cursor-pointer py-2 px-4 hover:bg-blue-600 rounded-md mt-1 flex items-center" href={"/cms/payments/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                    <Link className="cursor-pointer py-2 px-4 hover:bg-blue-600 rounded-md mt-1 flex items-center" href={"/cms/payments/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                    <Link className="cursor-pointer py-2 px-4 hover:bg-blue-600 rounded-md mt-1 flex items-center" href={"/cms/payments/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                    <Link className="cursor-pointer py-2 px-4 hover:bg-blue-600 rounded-md mt-1 flex items-center" href={"/cms/payments/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                </div>
            </div>
            {/*  */}
            <div className='mt-3 text-white'>
                <Link className="py-2.5 flex items-center rounded-md px-4 cursor-pointer hover:bg-blue-600" href={"/cms/configuration"}
                    onClick={() => setConfigDropDown(!configDropDown)}
                >
                    <VscSettings className="w-5 h-5" />
                    <div className="flex justify-between w-full items-center">
                        <span className="text-[15px] ml-4 text-gray-200">Cấu hình</span>
                        <span className="text-sm" id="arrow">
                            <FaChevronDown className="w-5 h-5" />
                        </span>
                    </div>
                </Link>
                <div className={`${configDropDown ? '' : 'hidden'} text-left text-sm mt-2 mx-auto text-gray-200`} id="submenu">
                    <Link className="cursor-pointer py-2 px-4 hover:bg-blue-600 rounded-md mt-1 flex items-center" href={"/cms/configuration/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                    <Link className="cursor-pointer py-2 px-4 hover:bg-blue-600 rounded-md mt-1 flex items-center" href={"/cms/configuration/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                    <Link className="cursor-pointer py-2 px-4 hover:bg-blue-600 rounded-md mt-1 flex items-center" href={"/cms/configuration/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                </div>
            </div>
            {/*  */}
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4  cursor-pointer hover:bg-blue-600 text-white">
                <MdLogout className="w-5 h-5" />
                <span className="text-[15px] ml-4 text-gray-200">Đăng xuất</span>
            </div>
        </aside >

    )
}

export default SideBar