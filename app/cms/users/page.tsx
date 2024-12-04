"use client"
import { icons } from "@/app/common/icons";
import { API } from "@/app/common/path";
import { getUsers, lockAccount, unlockAccount } from "@/app/services/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const UsersPage: React.FC = () => {
    const [checkBoxes, setCheckBoxes] = useState<number[]>([])
    const [checkAll, setCheckAll] = useState<boolean>(false)
    const { FaFilter, CiLock, CiUnlock, FaRegTrashAlt, FaChevronDown, IoIosAddCircleOutline } = icons
    // const [users, setUsers] = useState<User[]>([])
    const { data, status } = useSession();

    const getUsersAction = async () => {
        try {
            const response = await getUsers(data?.user.access_token ?? "");
            if (response?.status === "OK") {
                // setUsers((response.data.users as User[]).filter(user => user.isAdmin != true))
            } else {
                toast.error(response)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data.error)
            }
        }
    }

    // useEffect(() => {
    //     console.log(status);
    //     if (status === "authenticated" && data != null) getUsersAction()
    // }, [data, status])

    if (status === 'authenticated') {
        const { data: users, isLoading } = useQuery({
            queryKey: [API.READ_USERS],
            queryFn: () => getUsers(data?.user.access_token ?? "")
        })
        console.log(users);
    }




    const selectOne = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        // if (e.target.checked) {
        //     if (!checkBoxes.includes(i)) {
        //         setCheckBoxes(checkBoxes.concat(i))
        //     }
        //     if (checkBoxes.length + 1 == dummy.length) setCheckAll(true)
        // } else {
        //     setCheckAll(false)
        //     setCheckBoxes(checkBoxes.filter((v) => v !== i))
        // }
    }

    const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
        // setCheckAll(e.target.checked)
        // if (e.target.checked) {
        //     setCheckBoxes(dummy)
        // } else {
        //     setCheckBoxes([])
        // }
    }

    const lockAccountAction = async (id: string) => {
        try {
            const response = await lockAccount(data?.user.access_token ?? "", id)
            if (response?.status === "OK") {
                toast.success(response.message)
                getUsersAction()
            } else {
                toast.error(response.message | response)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data.error)
            }
        }
    }

    const unlockAccountAction = async (id: string) => {
        try {
            const response = await unlockAccount(data?.user.access_token ?? "", id)
            if (response?.status === "OK") {
                toast.success(response.message)
                getUsersAction()
            } else {
                toast.error(response.message | response)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data.error)
            }
        }
    }

    return (
        <>
            <main className="h-full">
                <div className="mt-5 mb-5 px-6">
                    <div className="flex items-center justify-between mb-2 text-2xl font-semibold">
                        <h2>Người dùng</h2>
                        <div className="flex gap-2">
                            <Link href={"/cms/users/create"} className="flex items-center text-sm font-medium rounded-xl bg-blue-300 gap-1 text-white py-2 px-4">
                                <IoIosAddCircleOutline className="w-5 h-5" />
                                <span>Thêm mới</span>
                            </Link>
                            <button className="flex items-center text-sm font-medium rounded-xl bg-red-600 gap-1 text-white py-2 px-4">
                                <FaRegTrashAlt className="w-5 h-5" />
                                <span>Xóa</span>
                            </button>
                        </div>
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
                                            <th className="px-2 py-2 bg-gray-50" >
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 group focus:outline-none">
                                                    <input type="checkbox" onChange={(e) => selectAll(e)} checked={checkAll} />
                                                </button>
                                            </th>
                                            <th className="px-3 py-2 md:py-3 bg-gray-50 w-[50px]">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 group focus:outline-none focus:underline">
                                                    <span>ID</span>
                                                    <span className="relative flex items-center">
                                                        <FaChevronDown className="w-2 h-2" />
                                                    </span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2 md:py-3 bg-gray-50 w-[120px]">
                                                <span className="block text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left">
                                                    Tên
                                                </span>
                                            </th>
                                            <th className="px-3 py-2 md:py-3 bg-gray-50 w-1/3">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>Email</span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2 md:py-3 bg-gray-50">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>Vai trò</span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2  md:py-3 bg-gray-50">
                                                <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                    <span>SĐT</span>
                                                    <span className="relative flex items-center">
                                                        <FaChevronDown className="w-2 h-2" />
                                                    </span>
                                                </button>
                                            </th>
                                            <th className="px-3 py-2 md:py-3 bg-gray-50 flex items-center">
                                                <span
                                                    className="block text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left">
                                                    Hành động
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            // users.length > 0 ? users.map((v, i) => {
                                            //     return (
                                            //         <tr key={i} className="bg-white">
                                            //             <td className="px-2 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                            //                 <input onChange={(e) => selectOne(e, i)} checked={checkBoxes.includes(i)} type="checkbox" />
                                            //             </td>
                                            //             <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                            //                 {i}
                                            //             </td>

                                            //             <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                            //                 <div className="text-gray-700">
                                            //                     <span>{v.name}</span>
                                            //                 </div>
                                            //             </td>

                                            //             <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                            //                 <span>{v.email}</span>
                                            //             </td>

                                            //             <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                            //                 <div className="text-gray-700">
                                            //                     <span className="font-medium">{v.role}</span>
                                            //                 </div>
                                            //             </td>

                                            //             <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                            //                 <span className="font-medium">{v.phone}</span>
                                            //             </td>

                                            //             <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                            //                 <button className="flex items-center text-sm font-medium leading-5 text-center text-white bg-red-600 p-2 transition-colors duration-150 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                                            //                     onClick={() => v.isLocked ? unlockAccountAction(v._id!) : lockAccountAction(v._id!)}
                                            //                 >
                                            //                     {
                                            //                         v.isLocked ?
                                            //                             <CiUnlock className='w-5 h-5' title="Mở khóa" /> :
                                            //                             <CiLock className='w-5 h-5' title="Khóa" />
                                            //                     }
                                            //                 </button>
                                            //             </td>
                                            //         </tr>
                                            //     )
                                            // }) : <tr>
                                            //     <td colSpan={7}>
                                            //         <div className="mx-auto w-fit">
                                            //             <RotatingLines
                                            //                 visible={true}
                                            //                 width="96"
                                            //                 strokeWidth="5"
                                            //                 animationDuration="0.75"
                                            //                 ariaLabel="rotating-lines-loading"
                                            //             />
                                            //         </div>
                                            //     </td>
                                            // </tr>
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
            </main>

        </>
    )
}

export default UsersPage