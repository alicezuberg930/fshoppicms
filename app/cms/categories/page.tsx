'use client'
import { icons } from '@/app/common/icons'
import LoadingShimmer from '@/app/components/LoadingShimmer'
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import { readCategoryHook } from '@/app/hooks/category.hooks'
import CategoryList from '@/app/components/CategoryList'
import CustomPaginator from '@/app/components/CustomPaginator'
import CategoryModal from '@/app/components/CategoryModal'

const CategoriesPage: React.FC = () => {
    // icons
    const { FaFilter, FaRegTrashAlt, FaChevronDown, IoIosAddCircleOutline } = icons
    // hooks    
    const [checkBoxes, setCheckBoxes] = useState<number[]>([])
    const [checkAll, setCheckAll] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { data: categories, isLoading } = readCategoryHook(currentPage)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

    const dummy: number[] = [];
    for (let i = 0; i <= 8; i++) {
        dummy.push(i)
    };

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

    return (
        <main className='h-full'>
            <div className='py-5 px-2 md:px-6'>
                <div className='flex items-center justify-between mb-2 text-2xl font-semibold'>
                    <h2 className='text-black'>Danh mục</h2>
                    <div className='flex gap-2'>
                        <Link href='/cms/categories/create' className='flex items-center text-sm font-medium rounded-xl bg-blue-300 gap-1 text-white py-2 px-4'>
                            <IoIosAddCircleOutline className='w-5 h-5' />
                            <span>Thêm mới</span>
                        </Link>
                        <button className='flex items-center text-sm font-medium rounded-xl bg-red-600 gap-1 text-white py-2 px-4'>
                            <FaRegTrashAlt className='w-5 h-5' />
                            <span>Xóa</span>
                        </button>
                    </div>
                </div>
                <div className='flex-col text-black'>
                    <div className='space-y-4'>
                        <div className=''>
                            <div className='w-full mb-4 md:mb-0 flex items-center gap-4'>
                                <div className='rounded-md shadow-sm border'>
                                    <input placeholder='Tìm kiếm' type='text' className='p-2 shadow-sm block sm:text-sm sm:leading-5 focus:outline-none focus:border-indigo-300 focus:shadow-blue-300 rounded-md' />
                                </div>
                                <div className='relative block text-left md:inline-block'>
                                    <button className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none'>
                                        <FaFilter className='w-4 h-4' />
                                        <span>Filters</span>
                                    </button>
                                    <div className='absolute right-0 z-50 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg md:w-56 ring-1 ring-black ring-opacity-5 focus:outline-none'
                                        role='menu' aria-orientation='vertical' aria-labelledby='filters-menu'>
                                        <div className='py-1' hidden>
                                            <div className='block px-4 py-2 text-sm text-gray-700' role='menuitem'>
                                                <label className='block text-sm font-medium leading-5 text-gray-700 ltr:text-left rtl:text-right'>
                                                    Digital
                                                </label>
                                                <div className='mt-1 relative rounded-md shadow-sm'>
                                                    <select id='filter-digital' className='rounded-md shadow-sm block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo sm:text-sm sm:leading-5'>
                                                        <option value=''>Any</option>
                                                        <option value='1'>Yes</option>
                                                        <option value='0'>No</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='rounded-md shadow-sm border'>
                                    <select className='block w-full py-2 pl-3 pr-10 text-base leading-6 border border-gray-300 focus:outline-none focus:border-indigo-300 focus:shadow-blue-300 sm:text-sm'>
                                        <option value='5'>5</option>
                                        <option value='10'>10</option>
                                        <option value='15'>15</option>
                                        <option value='20'>20</option>
                                        <option value='50'>50</option>
                                        <option value='100'>100</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='align-middle min-w-full shadow rounded-none md:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead>
                                    <tr>
                                        <th className='px-2 py-2 bg-gray-50'>
                                            <button className='flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 group focus:outline-none'>
                                                <input type='checkbox' onChange={(e) => selectAll(e)} checked={checkAll} />
                                            </button>
                                        </th>
                                        <th className='px-3 py-2 md:py-3 bg-gray-50 w-[50px]'>
                                            <button className='flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 group focus:outline-none focus:underline'>
                                                <span>ID</span>
                                                <span className='relative flex items-center'>
                                                    <FaChevronDown className='w-2 h-2' />
                                                </span>
                                            </button>
                                        </th>
                                        <th className='px-3 py-2 md:py-3 bg-gray-50 w-[120px]'>
                                            <span className='block text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left'>
                                                Ảnh
                                            </span>
                                        </th>
                                        <th className='px-3 py-2 md:py-3 bg-gray-50 w-1/3'>
                                            <button className='flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline'>
                                                <span>Tên</span>
                                            </button>
                                        </th>
                                        <th className='px-3 py-2 md:py-3 bg-gray-50'>
                                            <button className='flex items-center space-x-1 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left group focus:outline-none focus:underline'>
                                                <span>Danh mục cha</span>
                                            </button>
                                        </th>
                                        <th className='px-3 py-2 md:py-3 bg-gray-50 flex items-center'>
                                            <span className='block text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase text-left'>
                                                Hành động
                                            </span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {
                                        isLoading ?
                                            <tr>
                                                <td colSpan={7}>
                                                    <div className="w-full p-3">
                                                        <LoadingShimmer />
                                                    </div>
                                                </td>
                                            </tr> :
                                            categories?.categories && <CategoryList setSelectedCategory={setSelectedCategory} categories={categories?.categories?.data.categories as Category[]} currentPage={currentPage} />
                                    }
                                </tbody>
                            </table>
                        </div>
                        {
                            isLoading ? <></> :
                                true ? <CustomPaginator setCurrentPage={setCurrentPage} currentPage={currentPage} totalPage={categories?.categories?.data.page} /> : <></>
                        }
                    </div>
                </div>
            </div>
            <div className={`w-full h-screen fixed inset-0 z-20 overflow-y-scroll ${selectedCategory != null ? 'block' : 'hidden'}`}>
                <div className="flex items-end justify-center min-h-screen px-4 py-6 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="z-30 relative inline-block bg-white shadow-xl my-8 sm:align-middle max-w-5xl rounded-md w-full">
                        <div className="px-4 py-5 bg-white text-left rounded-md">
                            {selectedCategory ? <CategoryModal selectedCategory={selectedCategory!} setSelected={setSelectedCategory} page={currentPage} /> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CategoriesPage