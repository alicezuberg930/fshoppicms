"use client"
import { icons } from "@/app/common/icons"
import { deleteCategory, getCategories } from "@/app/services/api"
import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import { RotatingLines } from "react-loader-spinner"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const CategoriesPage: React.FC = () => {
    const { FaFilter, MdModeEdit, FaRegTrashAlt, FaChevronDown, IoIosAddCircleOutline } = icons
    const [checkBoxes, setCheckBoxes] = useState<number[]>([])
    const [checkAll, setCheckAll] = useState<boolean>(false)
    const [categories, setCategories] = useState<Category[]>([])
    const { data, status } = useSession();

    const dummy: number[] = [];
    for (let i = 0; i <= 8; i++) {
        dummy.push(i)
    };

    const getCategoriesAction = async () => {
        try {
            const response = await getCategories(data?.user.access_token ?? "");
            if (response.data?.status === "OK") {
                setCategories(response.data.data.categories as Category[])
            } else {
                toast.error(response.data)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data.error)
            }
        }
    }

    useEffect(() => {
        console.log(status, data);

        if (status === "authenticated") getCategoriesAction()
    }, [data, status])

    const selectOne = (e: ChangeEvent<HTMLInputElement>, i: number) => {
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

    const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckAll(e.target.checked)
        if (e.target.checked) {
            setCheckBoxes(dummy)
        } else {
            setCheckBoxes([])
        }
    }

    const deleteCategoryAction = async (id: string) => {
        withReactContent(Swal).fire({
            title: "Bạn có chắc chắn không?",
            text: "Bạn sẽ không thể đảo ngược hành động",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteCategory(data?.user.access_token ?? "", id)
                    if (response.data?.status === "OK") {
                        toast.success(response.data.message)
                        getCategoriesAction()
                    } else {
                        toast.error(response.data.message)
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        toast.error(error?.response?.data.error)
                    }
                }
            }
        })
    }

    return (
        <main className="h-full">
            {/* {JSON.stringify(data)} */}
            <div className="mt-5 mb-5 px-6">
                <div className="flex items-center justify-between mb-2 text-2xl font-semibold">
                    <h2>Danh mục</h2>
                    <div className="flex gap-2">
                        <Link className="flex items-center text-sm font-medium rounded-xl bg-blue-300 gap-1 text-white py-2 px-4" href="/cms/categories/create">
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
                                        <th className="px-2 py-2 bg-gray-50">
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
                                                Ảnh
                                            </span>
                                        </th>
                                        <th className="px-3 py-2 md:py-3 bg-gray-50 w-1/3">
                                            <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                <span>Tên</span>
                                            </button>
                                        </th>
                                        <th className="px-3 py-2 md:py-3 bg-gray-50">
                                            <button className="flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline">
                                                <span>Danh mục cha</span>
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
                                        categories.length > 0 ?
                                            categories.map((v, i) => {
                                                return (
                                                    <tr key={i} className="bg-white">
                                                        <td className="px-2 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <input onChange={(e) => selectOne(e, i)} checked={checkBoxes.includes(i)} type="checkbox" />
                                                        </td>
                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            {i}
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="h-24 w-20">
                                                                <img className="object-cover w-full h-full" srcSet={v.thumnail} />
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="text-gray-700 text-ellipsis overflow-hidden line-clamp-2">
                                                                {v.name}
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            {v.parentCategory}
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="flex flex-wrap justify-start gap-1">
                                                                <button className="p-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-700 focus:outline-none" title="Edit">
                                                                    <MdModeEdit className="w-5 h-5" />
                                                                </button>
                                                                <button onClick={() => deleteCategoryAction(v._id!)} className="flex items-center p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700" title="Delete">
                                                                    <FaRegTrashAlt className='w-5 h-5' />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }) :
                                            <tr>
                                                <td colSpan={7}>
                                                    <div className="mx-auto w-fit">
                                                        <RotatingLines
                                                            visible={true}
                                                            width="96"
                                                            strokeWidth="5"
                                                            animationDuration="0.75"
                                                            ariaLabel="rotating-lines-loading"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
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
    )
}

export default CategoriesPage