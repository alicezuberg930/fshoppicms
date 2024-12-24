"use client"
import { icons } from "@/app/common/icons";
import { PATH } from "@/app/common/path";
import BrandModal from "@/app/components/BrandModal";
import LoadingShimmer from "@/app/components/LoadingShimmer";
import { deleteBrandHook, readBrandsHook } from "@/app/hooks/brands.hooks";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const BrandsPage: React.FC = () => {
    const { IoIosAddCircleOutline, MdModeEdit, FaRegTrashAlt } = icons
    const { data: brands, isLoading } = readBrandsHook(1)
    const deleteHook = deleteBrandHook()
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)

    const deleteBrandAction = (id: string) => {
        withReactContent(Swal).fire({
            title: 'Bạn có chắc chắn không?',
            text: 'Bạn sẽ không thể đảo ngược hành động',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then(result => {
            if (result.isConfirmed) deleteHook.mutate(id)
        })
    }

    return (
        <main className="h-full">
            <div className="py-5 px-2 md:px-6">
                <div className="flex justify-between items-center mb-2 font-semibold text-2xl">
                    <h2>Thương hiệu</h2>
                    <Link href={PATH.CREATE_BRAND} className="flex items-center gap-1 bg-blue-300 px-4 py-2 rounded-xl font-medium text-sm text-white">
                        <IoIosAddCircleOutline className="w-5 h-5" />
                        <span>Thêm mới</span>
                    </Link>
                </div>
                <div className="flex-col">
                    <div className="space-y-4">
                        <div className="flex lg:flex-row flex-col justify-between gap-2">
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                <div className="shadow-sm border rounded-md">
                                    <input placeholder="Tìm kiếm" type="text" className="block focus:border-indigo-300 shadow-sm focus:shadow-blue-300 p-2 rounded-md sm:text-sm sm:leading-5 focus:outline-none" />
                                </div>
                                <div className="shadow-sm border rounded-md">
                                    <select className="block border-gray-300 focus:border-indigo-300 focus:shadow-blue-300 py-2 pr-10 pl-3 border w-full text-base leading-6 focus:outline-none sm:text-sm">
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
                        <div className="shadow rounded-none md:rounded-lg min-w-full align-middle">
                            <table className="divide-y divide-gray-200 min-w-full">
                                <thead>
                                    <tr>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3 w-36">
                                            <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>ID</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Tên</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Logo</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Hành động</span>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        isLoading ?
                                            <tr>
                                                <td colSpan={7}>
                                                    <div className="w-full p-3">
                                                        <LoadingShimmer />
                                                    </div>
                                                </td>
                                            </tr> :
                                            brands && (brands.brands.data as Brand[]).map((v, i) => {
                                                return (
                                                    <tr key={i} className="bg-white">
                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{i}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.name}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="h-24 w-20">
                                                                <img className="object-cover w-full h-full" src={v.logo ?? '/logo.png'} />
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="flex flex-wrap justify-start gap-1">
                                                                <button onClick={() => setSelectedBrand(v)} className="p-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-700 focus:outline-none" title="Edit">
                                                                    <MdModeEdit className="w-5 h-5" />
                                                                </button>
                                                                <button onClick={() => deleteBrandAction(v._id!)} className="flex items-center p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700" title="Delete">
                                                                    <FaRegTrashAlt className='w-5 h-5' />
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
                        {
                            /* <div className="p-6 md:p-0">
                                {{ $products->links() }}
                            </div> */
                        }
                    </div>
                </div>
            </div>
            <div className={`w-full h-screen fixed inset-0 z-20 overflow-y-scroll ${selectedBrand != null ? 'block' : 'hidden'}`}>
                <div className="flex items-end justify-center min-h-screen px-4 py-6 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="z-30 relative inline-block bg-white shadow-xl my-8 sm:align-middle max-w-5xl rounded-md w-full">
                        <div className="px-4 py-5 bg-white text-left rounded-md">
                            {selectedBrand ? <BrandModal selectedBrand={selectedBrand} setSelected={setSelectedBrand} /> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BrandsPage