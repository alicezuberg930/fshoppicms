'use client'
import React, { useContext, useState } from 'react';
import { AdminContext } from "@/app/hooks/admin.context";
import Link from 'next/link'
import { icons } from '@/app/common/icons';

const SideBar: React.FC = () => {
    const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;
    const {
        MdCancel, FaUser, FaBox, SiChatbot, FaChevronDown, MdLogout, FaBoxOpen,
        TbLayoutDashboard, CiShoppingBasket, PiShippingContainer, VscSettings
    } = icons
    const [paymentsDropDown, setPaymentsDropDown] = useState<boolean>(false)
    const [configDropDown, setConfigDropDown] = useState<boolean>(false)
    const [productlistDropdown, setProductlistDropdown] = useState<boolean>(false)
    const [orderListDropdown, setOrderListDropdown] = useState<boolean>(false)
    return (
        <aside className={collapseMenu ? "hidden" : "hidden lg:block z-20 flex-shrink-0 w-[270px] p-1 overflow-y-auto text-center bg-gray-800 h-full"}>
            <div className="text-gray-100 text-xl">
                <div className="p-1 mt-1 flex items-center justify-between">
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
            <Link className="p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600 text-white" href={"/cms/dashboard"}>
                <TbLayoutDashboard className="w-5 h-5" />
                <span className="text-[15px] ml-4 text-gray-200">Dashboard</span>
            </Link>
            {/* Đơn hàng */}
            <div className='mt-3 text-white'>
                <div className="p-2 flex items-center rounded-md cursor-pointer hover:bg-blue-600"
                    onClick={() => setOrderListDropdown(!orderListDropdown)}
                >
                    <CiShoppingBasket className="w-5 h-5" />
                    <div className="flex justify-between w-full items-center">
                        <span className="text-[15px] ml-4 text-gray-200">Đơn hàng</span>
                        <span className="text-sm" id="arrow">
                            <FaChevronDown className="w-5 h-5" />
                        </span>
                    </div>
                </div>
                <div className={`${orderListDropdown ? '' : 'hidden'} text-left text-sm mx-auto text-gray-200`} id="submenu">
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center justify-between" href="/cms/orders/new">
                        <div className='flex items-center'>
                            <FaBoxOpen className="w-5 h-5" />
                            <span className="text-[15px] ml-4 text-gray-200">Đơn hàng mới</span>
                        </div>
                        <div className='px-2 bg-red-500 rounded-lg'>15</div>
                    </Link>
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href="/cms/orders/approved">
                        <FaBoxOpen className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Đơn hàng đã xác nhận</span>
                    </Link>
                </div>
            </div>
            {/*  */}
            <Link className="p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600 text-white" href={"/cms/customers"}>
                <FaUser className="w-5 h-5" />
                <span className="text-[15px] ml-4 text-gray-200">Khách hàng</span>
            </Link>
            {/*  */}
            <Link className="p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600 text-white" href={"/cms/shippings"}>
                <PiShippingContainer className="w-5 h-5" />
                <span className="text-[15px] ml-4 text-gray-200">Giao hàng</span>
            </Link>
            {/*  */}
            <div className='mt-3 text-white'>
                <div className="p-2 flex items-center rounded-md cursor-pointer hover:bg-blue-600"
                    onClick={() => setProductlistDropdown(!productlistDropdown)}
                >
                    <FaBoxOpen className="w-5 h-5" />
                    <div className="flex justify-between w-full items-center">
                        <span className="text-[15px] ml-4 text-gray-200">Danh sách sản phẩm</span>
                        <span className="text-sm" id="arrow">
                            <FaChevronDown className="w-5 h-5" />
                        </span>
                    </div>
                </div>
                <div className={`${productlistDropdown ? '' : 'hidden'} text-left text-sm mx-auto text-gray-200`} id="submenu">
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href="/cms/products/current">
                        <FaBoxOpen className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sản phẩm đang bán</span>
                    </Link>
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href="cms/products/sale">
                        <FaBoxOpen className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Đang giảm giá</span>
                    </Link>
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href="cms/products/hidden">
                        <FaBoxOpen className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sản phẩm đang ẩn</span>
                    </Link>
                </div>
            </div>
            {/*  */}
            <div className='mt-3 text-white'>
                <Link className="p-2 flex items-center rounded-md cursor-pointer hover:bg-blue-600" href={"/cms/payments"}
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
                <div className={`${paymentsDropDown ? '' : 'hidden'} text-left text-sm mx-auto text-gray-200`} id="submenu">
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href={"/cms/payments/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href={"/cms/payments/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href={"/cms/payments/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                </div>
            </div>
            {/*  */}
            <div className='mt-3 text-white'>
                <Link className="p-2 flex items-center rounded-md cursor-pointer hover:bg-blue-600" href={"/cms/configuration"}
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
                <div className={`${configDropDown ? '' : 'hidden'} text-left text-sm mx-auto text-gray-200`} id="submenu">
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href={"/cms/configuration/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href={"/cms/configuration/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href={"/cms/configuration/sub1"}>
                        <SiChatbot className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Sub 1</span>
                    </Link>
                </div>
            </div>
            {/*  */}
            <div className="p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600 text-white">
                <MdLogout className="w-5 h-5" />
                <span className="text-[15px] ml-4 text-gray-200">Đăng xuất</span>
            </div>
        </aside >

    )
}

export default SideBar