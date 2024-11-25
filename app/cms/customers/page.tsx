"use client"
import { icons } from "@/app/common/icons";
import Checkbox from "@/app/components/checkbox";
import { useState } from "react";

const CustomersPage: React.FC = () => {
    const [checkBoxes, setCheckBoxes] = useState<number[]>([])
    const [checkAll, setCheckAll] = useState<boolean>(false)
    const { FaFilter, FaEye, MdModeEdit, FaRegTrashAlt, MdOutlineCancel, FaBan, FaChevronDown } = icons

    const dummy: number[] = [];
    for (let i = 0; i <= 8; i++) {
        dummy.push(i)
    };

    const selectOne = (e: any, i: number) => {
        if (e.target.checked) {
            if (!checkBoxes.includes(i)) {
                setCheckBoxes(checkBoxes.concat(i))
            }
            if (checkBoxes.length + 1 == dummy.length) setCheckAll(true)
        } else {
            setCheckAll(false)
            setCheckBoxes(checkBoxes.filter((v) => v !== i))
        }
    }

    const selectAll = (e: any) => {
        setCheckAll(e.target.checked)
        if (e.target.checked) {
            setCheckBoxes(dummy)
        } else {
            setCheckBoxes([])
        }
    }

    return (
        <>
            {JSON.stringify(checkBoxes)}
            <main className="h-full">
                <div className="mt-5 mb-5 px-6">
                    <div className="flex items-center justify-between mb-2 text-2xl font-semibold">
                        <h2>Khách hàng</h2>
                        <button className="flex items-center text-sm font-medium rounded-xl bg-blue-300 text-white py-2 px-4">
                            <span>Thêm mới</span>
                        </button>
                    </div>
                    <div className="flex-col">
                        <div className="space-y-4">
                            <div className="">
                                <div className="w-full mb-4 md:mb-0 flex items-center gap-4">
                                    <div className="rounded-md shadow-sm border">
                                        <input placeholder="Tìm kiếm" type="text" className="p-2 shadow-sm block sm:text-sm sm:leading-5 focus:outline-none focus:border-indigo-300 focus:shadow-blue-300 rounded-md" />
                                    </div>
                                    <div className="relative block text-left md:inline-block">
                                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
                                            <FaFilter className="w-4 h-4" />
                                            <span>Filters</span>
                                        </button>
                                        <div className="absolute right-0 z-50 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg md:w-56 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            role="menu" aria-orientation="vertical" aria-labelledby="filters-menu">
                                            <div className="py-1" hidden>
                                                <div className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                                                    <label className="block text-sm font-medium leading-5 text-gray-700 ltr:text-left rtl:text-right">
                                                        Digital
                                                    </label>
                                                    <div className="mt-1 relative rounded-md shadow-sm">
                                                        <select id="filter-digital" className="rounded-md shadow-sm block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo sm:text-sm sm:leading-5">
                                                            <option value="">Any</option>
                                                            <option value="1">Yes</option>
                                                            <option value="0">No</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-md shadow-sm border">
                                        <select className="block w-full py-2 pl-3 pr-10 text-base leading-6 border border-gray-300 focus:outline-none focus:border-indigo-300 focus:shadow-blue-300 sm:text-sm">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="align-middle min-w-full shadow rounded-none md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-2 py-2 md:px-3 bg-gray-50" >
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 group focus:outline-none focus:underline">
                                                    <input type="checkbox" onChange={(e) => selectAll(e)} checked={checkAll} />
                                                </button>
                                            </th>
                                            <th className="px-3 py-2 md:px-6 md:py-3 bg-gray-50">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 group focus:outline-none focus:underline">
                                                    <span>ID</span>
                                                    <span className="relative flex items-center">
                                                        <FaChevronDown className="w-2 h-2" />
                                                    </span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2 md:px-6 md:py-3 bg-gray-50">
                                                <span className="block text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left">
                                                    Ảnh
                                                </span>
                                            </th>
                                            <th className="px-3 py-2 md:px-6 md:py-3 bg-gray-50">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>Tên</span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2 md:px-6 md:py-3 bg-gray-50">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>Giá</span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2 md:px-6 md:py-3 bg-gray-50">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>Số lượng</span>
                                                    <span className="relative flex items-center">
                                                        <svg className="w-3 h-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2" d="M5 15l7-7 7 7"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2 md:px-6 md:py-3 bg-gray-50 flex items-center">
                                                <span
                                                    className="block text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left">
                                                    Hành động
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            dummy.map((v, i) => {
                                                return (
                                                    <tr key={i} className="bg-white">
                                                        <td className="px-2 py-2 md:px-3 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <input onChange={(e) => selectOne(e, i)} checked={checkBoxes.includes(i)} type="checkbox" />
                                                        </td>
                                                        <td className="px-3 py-2 md:px-6 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            {i}
                                                        </td>

                                                        <td className="px-3 py-2 md:px-6 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="h-24 w-20">
                                                                <img className="object-cover w-full h-full" srcSet="/logo.png" />
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:px-6 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="text-gray-700 text-ellipsis truncate line-clamp-1">
                                                                Người dùng {i * 1000000}
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:px-6 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{100000 * i} đ</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:px-6 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            {(i * 6)}
                                                        </td>

                                                        <td className="px-3 py-2 md:px-6 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="flex flex-wrap justify-start gap-1">
                                                                <button className="p-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-600 border border-transparent rounded-lg active:bg-yellow-600 hover:bg-yellow-700 focus:outline-none">
                                                                    <FaEye className="w-5 h-5" />
                                                                </button>
                                                                <button className="p-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-700 focus:outline-none" title="Edit">
                                                                    <MdModeEdit className="w-5 h-5" />
                                                                </button>
                                                                <button className="flex items-center p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red" title="Deactivate">
                                                                    <MdOutlineCancel className="w-5 h-5" />
                                                                </button>
                                                                <button className="flex items-center p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red" title="Delete">
                                                                    <FaRegTrashAlt className='w-5 h-5' />
                                                                </button>
                                                                <button className=" flex items-center p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-500 border border-transparent rounded-lg active:bg-gray-600 hover:bg-red-500 focus:outline-none focus:shadow-outline-gray" title="Set product to out of stock">
                                                                    <FaBan className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="p-6 md:p-0">
                        {{ $products->links() }}
                    </div> */}
                        </div>
                    </div>
                </div>
                {/* create modal */}
                <div className="w-full h-screen fixed inset-0 z-20 overflow-y-scroll" hidden>
                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="relative inline-block bg-white shadow-xl sm:my-8 sm:align-middle sm:max-w-3xl rounded-md w-full">
                            <form>
                                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4 text-left rounded-md">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-semibold">Tạo sản phẩm</span>
                                        <span className="text-white w-6 h-6">
                                            {/* <x-bi-x-circle-fill className="w-6 h-6" fill="red" /> */}
                                        </span>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-3/4">
                                            <label className="block mt-4 text-sm">
                                                <span className="text-gray-700">Tên</span>
                                                <input className="w-full p-2 mt-1 text-sm border border-gray-300 rounded focus:border-blue-300 focus:outline-none focus:shadow-sm" />
                                            </label>
                                        </div>
                                        <div className="w-1/4">
                                            <label className="block mt-4 text-sm">
                                                <span className="text-gray-700">Số lượng</span>
                                                <input className="w-full p-2 mt-1 text-sm border border-gray-300 rounded focus:border-blue-300 focus:outline-none focus:shadow-sm" step="1" type="number" value="1" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-3/4">
                                            <label className="block mt-4 text-sm">
                                                <span className="text-gray-700">Thể loại</span>
                                                <div className="w-full inline-block">
                                                    <select className="w-full p-2 mt-1 text-sm border border-gray-300 rounded focus:border-blue-300 focus:outline-none focus:shadow-sm">

                                                    </select>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="w-1/4">
                                            <label className="block mt-4 text-sm">
                                                <span className="text-gray-700">Nguồn gốc</span>
                                                <div className="w-full inline-block">
                                                    <select className="w-full p-2 mt-1 text-sm border border-gray-300 rounded focus:border-blue-300 focus:outline-none focus:shadow-sm">
                                                    </select>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mt-4 text-sm">
                                            <span className="text-gray-700">Hình ảnh</span>
                                            <div className="w-full mt-1 inline-block">
                                            </div>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block mt-4 text-sm">
                                            <span className="text-gray-700">Mô tả</span>
                                            <div className="w-full mt-1 inline-block h-56">
                                                <div x-data x-ref="editor">
                                                    description
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-3/4">
                                            <label className="block mt-4 text-sm">
                                                <span className="text-gray-700">Giá</span>
                                                <input className="w-full p-2 mt-1 text-sm border border-gray-300 rounded focus:border-blue-300 focus:outline-none focus:shadow-sm" step="1" type="number" value="1" />
                                            </label>
                                        </div>
                                        <div className="w-1/4">
                                            <label className="block mt-4 text-sm">
                                                <span className="text-gray-700">Giảm giá</span>
                                                <div className="w-full inline-block">
                                                    <select className="w-full p-2 mt-1 text-sm border border-gray-300 rounded focus:border-blue-300 focus:outline-none focus:shadow-sm">
                                                    </select>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mt-4 text-sm">
                                            <div className="flex items-center gap-4">
                                                <input className="w-5 h-5 border border-gray-300 rounded-sm" type="checkbox" />
                                                <span className="font-semibold text-gray-700">Kích hoạt</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 flex">
                                    <button type="submit"
                                        className="bg-blue-300 w-full px-4 py-2 font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Lưu
                                    </button>
                                    <button type="button"
                                        className="w-full px-4 py-2 mt-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Đóng
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* show details modal  */}
            </main>

        </>
    )
}

export default CustomersPage
