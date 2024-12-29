
import React, { useState } from 'react'
import { icons } from '../common/icons'
import { readCategoryHook } from '../hooks/category.hooks'
import { getSubCategories } from '../services/api.service'
import { toast } from 'react-toastify'

const CategoryModalPicker: React.FC = () => {
    const { MdModeEdit, MdCancel, FaChevronRight } = icons
    const [show, setShow] = useState<boolean>()
    const { data: categories, isLoading: loadingCategories } = readCategoryHook(1)
    const [subCategories, setSubcategories] = useState<Category[]>([])
    const [chosenCategory, setChosenCateggory] = useState<string[]>([])
    const [categoryID, setCategoryID] = useState<string>('')

    const getSubCategoriesAction = async (id: string) => {
        try {
            const response = await getSubCategories(id)
            setSubcategories(response.category.data)
        } catch (error) {
            setSubcategories([])
        }
    }

    return (
        <>
            <div className='text-gray-400 border-gray-300 p-2 border rounded-md w-full outline-none table' onClick={() => setShow(true)}>
                <span className='table-cell align-middle w-full'>
                    {
                        chosenCategory.length > 0 ? chosenCategory.map((str, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <span className='pr-2'>{str}</span>
                                    {i < chosenCategory.length - 1 ? <span className='pr-2'>&gt;</span> : <></>}
                                </React.Fragment>
                            )
                        }) : 'Chọn ngành hàng'
                    }
                </span>
                <span className='table-cell align-middle'>
                    <MdModeEdit size={16} />
                </span>
                <input className='hidden' type='text' name='category' value={categoryID} readOnly />
            </div>
            <div className={`w-full h-screen fixed inset-0 z-20 overflow-y-scroll text-black ${show ? 'block' : 'hidden'}`}>
                <div className='flex items-end justify-center min-h-screen px-4 py-6 text-center sm:block sm:p-0'>
                    <div className='fixed inset-0 transition-opacity'>
                        <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                    </div>
                    <div className='z-30 relative inline-block bg-white shadow-xl my-8 sm:align-middle max-w-5xl rounded-md w-full'>
                        <div className='px-4 py-5 bg-white text-left rounded-md'>
                            <div className='table text-xl font-semibold mb-3'>
                                <div className='table-cell align-middle w-full'>
                                    Chỉnh sửa ngành hàng
                                </div>
                                <span className='table-cell align-middle' onClick={() => setShow(false)}>
                                    <MdCancel size={24} />
                                </span>
                            </div>
                            <div className=''>
                                <div className=''>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex-none w-[240px]'>
                                            <div className=''>
                                                <input placeholder='Vui lòng nhập tối thiểu 1 ký tự.' type='text'
                                                    className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                                />
                                            </div>
                                        </div>
                                        <div className='global-project-guide-text category'>
                                            Chọn ngành hàng chính xác, <a href='https://banhang.shopee.vn/edu/category-guide' target='_blank' className='text-blue-500'>bấm vào đây để tìm hiểu</a>
                                        </div>
                                    </div>
                                    <div className='my-4 h-[300px] whitespace-nowrap'>
                                        <div className='rounded-md shadow-lg h-full overflow-x-scroll overflow-y-hidden'>
                                            <ul className='text-sm w-[240px] inline-block overflow-y-scroll h-full'>
                                                {loadingCategories ? <></> :
                                                    categories && categories?.categories?.data.categories.map((category: Category) => {
                                                        return (
                                                            <li onClick={() => {
                                                                getSubCategoriesAction(category._id!)
                                                                setChosenCateggory([category.name!])
                                                                setCategoryID(category._id!)
                                                            }} key={category._id} className='category-item px-4 py-2 hover:bg-gray-100 items-center flex justify-between cursor-pointer'>
                                                                <p className='overflow-hidden text-ellipsis'>{category.name}</p>
                                                                <div>
                                                                    <FaChevronRight />
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <ul className='text-sm w-[240px] inline-block border-l overflow-y-scroll h-full'>
                                                {
                                                    subCategories.length > 0 ? subCategories?.map((category: Category) => {
                                                        return (
                                                            <li key={category._id} onClick={() => {
                                                                setChosenCateggory(prev => prev.length == 1 ? prev.concat(category.name!) : [...prev.filter((_, i) => i !== prev.length - 1), category.name!])
                                                                setCategoryID(category._id!)
                                                            }} className='category-item px-4 py-2 hover:bg-gray-100 items-center flex justify-between cursor-pointer'>
                                                                <p className='overflow-hidden text-ellipsis'>{category.name}</p>
                                                                <div>
                                                                    <FaChevronRight />
                                                                </div>
                                                            </li>
                                                        )
                                                    }) :
                                                        <li className='px-4 py-2'>
                                                            <p className='overflow-hidden text-ellipsis'>Không có danh mục con</p>
                                                        </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='category-selected text-sm'>
                                    <span>Đã chọn: </span>
                                    {
                                        chosenCategory.map((str, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                    <span className='pr-2 font-semibold'>{str}</span>
                                                    {i < chosenCategory.length - 1 ? <span className='pr-2 font-semibold'>&gt;</span> : <></>}
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <button className='rounded-md border border-gray-400 py-2 px-4 mr-2' onClick={() => setShow(false)}>Hủy</button>
                                    <button className='rounded-md bg-blue-300 text-white py-2 px-4 ml-2' onClick={() => {
                                        if (categoryID == '') {
                                            toast.error('Hãy chọn 1 ngành hàng (danh mục)')
                                            return
                                        }
                                        setShow(false)
                                    }} >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryModalPicker