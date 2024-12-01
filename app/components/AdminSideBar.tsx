'use client'
import React, { useState } from 'react';
import Link from 'next/link'
import { icons } from '@/app/common/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCollapseSidebar } from '../services/sidebar.slice';
import { PATH } from '../common/path';
import { usePathname } from "next/navigation";
import { setConfigDropDown, setOrderDropDown, setProductDropDown } from '../services/dropdown.slice';

const AdminSideBar: React.FC = () => {
    const {
        MdCancel, FaUser, FaBox, SiChatbot, FaChevronDown, MdLogout, FaBoxOpen,
        TbLayoutDashboard, CiShoppingBasket, PiShippingContainer, VscSettings
    } = icons
    // const [paymentsDropDown, setPaymentsDropDown] = useState<boolean>(false)
    const { isCollapsed } = useSelector((state: any) => state.sidebar)
    const { isOrder, isProduct, isConfig } = useSelector((state: any) => state.dropdown)
    const dispatch = useDispatch()
    const currentPath = usePathname();

    return (
        <aside className={isCollapsed ? "hidden" : "select-none hidden lg:block z-20 flex-shrink-0 w-[260px] p-1 overflow-y-auto text-center bg-gray-800 h-full"}>
            <div className="text-xl">
                <div className="p-3 flex items-center justify-between text-white">
                    <div className="flex items-center">
                        <img srcSet='/logo.svg' className='w-12' />
                        <h1 className="font-bold ml-3">FShoppii</h1>
                    </div>
                    <MdCancel className="w-5 h-5" onClick={() => { dispatch(setCollapseSidebar(!isCollapsed)) }} />
                </div>
                <div className="my-2 bg-gray-600 h-[1px]"></div>
            </div>
            {/* Danh mục */} 
            <Link className={`${currentPath === PATH.CATEGORIES ? 'bg-blue-600' : ''} p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600 text-white`} href={PATH.CATEGORIES}>
                <PiShippingContainer className="w-5 h-5" />
                <span className="text-[15px] ml-4 text-gray-200">Danh mục</span>
            </Link>
            {/* Đơn hàng */}
            <div className='mt-3 text-white'>
                <div className="p-2 flex items-center rounded-md cursor-pointer hover:bg-blue-600"
                    onClick={() => dispatch(setOrderDropDown(!isOrder))}
                >
                    <CiShoppingBasket className="w-5 h-5" />
                    <div className="flex justify-between w-full items-center">
                        <span className="text-[15px] ml-4 text-gray-200">Đơn hàng</span>
                        <span className={`${isOrder ? 'rotate-180' : ''}`} id="arrow">
                            <FaChevronDown className="w-4 h-4" />
                        </span>
                    </div>
                </div>
                <div className={`${isOrder ? '' : 'hidden'} text-left mx-auto text-gray-200`} id="submenu">
                    <Link className={`${currentPath === PATH.ORDERS_NEW ? 'bg-blue-600' : ''} cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center justify-between`} href={PATH.ORDERS_NEW}>
                        <div className='flex items-center'>
                            <FaBoxOpen className="w-5 h-5" />
                            <span className="text-[15px] ml-4 text-gray-200">Đơn hàng mới</span>
                        </div>
                        <div className='px-2 bg-red-500 rounded-lg text-sm'>15</div>
                    </Link>
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href="/cms/orders/processing">
                        <FaBoxOpen className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Đơn hàng đang xử lý</span>
                    </Link>
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href="/cms/orders/success">
                        <FaBoxOpen className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Đơn hàng thành công</span>
                    </Link>
                    <Link className={`${currentPath === PATH.ORDERS_ALL ? 'bg-blue-600' : ''} cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center`} href="/cms/orders">
                        <FaBoxOpen className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Tất cả đơn hàng</span>
                    </Link>
                </div>
            </div>
            {/* Người dùng */}
            <Link className={`${currentPath === PATH.USERS ? 'bg-blue-600' : ''} p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600 text-white`} href={PATH.USERS}>
                <FaUser className="w-5 h-5" />
                <span className="text-[15px] ml-4 text-gray-200">Người dùng</span>
            </Link>
            {/* Sản phẩm */}
            <div className='mt-3 text-white'>
                <div className="p-2 flex items-center rounded-md cursor-pointer hover:bg-blue-600"
                    onClick={() => dispatch(setProductDropDown(!isProduct))}
                >
                    <FaBoxOpen className="w-5 h-5" />
                    <div className="flex justify-between w-full items-center">
                        <span className="text-[15px] ml-4 text-gray-200">Danh sách sản phẩm</span>
                        <span className={`${isProduct ? 'rotate-180' : ''}`} id="arrow">
                            <FaChevronDown className="w-4 h-4" />
                        </span>
                    </div>
                </div>
                <div className={`${isProduct ? '' : 'hidden'} text-left mx-auto text-gray-200`} id="submenu">
                    <Link className={`${currentPath === PATH.PRODUCT_CURRENT ? 'bg-blue-600' : ''} cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center`} href={PATH.PRODUCT_CURRENT}>
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
            {/* Cấu hình */}
            <div className='mt-3 text-white'>
                <div className="p-2 flex items-center rounded-md cursor-pointer hover:bg-blue-600"
                    onClick={() => dispatch(setConfigDropDown(!isConfig))}
                >
                    <VscSettings className="w-5 h-5" />
                    <div className="flex justify-between w-full items-center">
                        <span className="text-[15px] ml-4 text-gray-200">Cấu hình</span>
                        <span className={`${isConfig ? 'rotate-180' : ''}`} id="arrow">
                            <FaChevronDown className="w-4 h-4" />
                        </span>
                    </div>
                </div>
                <div className={`${isConfig ? '' : 'hidden'} text-left mx-auto text-gray-200`} id="submenu">
                    <Link className={`${currentPath === PATH.SITE_CONFIG ? 'bg-blue-600' : ''} cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center`} href={PATH.SITE_CONFIG}>
                        <FaBoxOpen className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Cấu hình site</span>
                    </Link>
                    <Link className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-3 flex items-center" href="/cms/orders/processing">
                        <FaBoxOpen className="w-5 h-5" />
                        <span className="text-[15px] ml-4 text-gray-200">Cấu hình email</span>
                    </Link>
                </div>
            </div>
            {/* Đăng xuất */}
            <div className="p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-blue-600 text-white">
                <MdLogout className="w-5 h-5" />
                <span className="text-[15px] ml-4 text-gray-200">Đăng xuất</span>
            </div>
        </aside >
    )
}

export default AdminSideBar