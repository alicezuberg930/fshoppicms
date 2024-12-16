import React from "react";
import { icons } from "../common/icons";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2'
import { deleteCategoryHook } from "../hooks/category.hooks";
import Image from "next/image";

const CategoryList: React.FC<{ categories: Category[], parentIndex?: string, currentPage: number, parentCategory?: string }> = ({ categories, parentIndex = "", currentPage = 1, parentCategory = "" }) => {
    const mutation = deleteCategoryHook(currentPage)
    const { MdModeEdit, FaRegTrashAlt } = icons

    const handleDeleteCategory = async (id: string) => {
        withReactContent(Swal).fire({
            title: 'Bạn có chắc chắn không?',
            text: 'Bạn sẽ không thể đảo ngược hành động',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then(result => { if (result.isConfirmed) mutation.mutate(id) })
    }

    return (
        <>
            {
                categories.map((category, index) => {
                    const currentIndex = parentIndex ? `${parentIndex}.${index + 1}` : `${index + 1}`;
                    return (
                        <React.Fragment key={category._id || currentIndex}>
                            {/* Main Category List */}
                            <tr className="bg-white">
                                <td className="px-2 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                    <input type="checkbox" />
                                </td>
                                <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                    {currentIndex}
                                </td>
                                <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                    <div className="h-24 w-20 relative">
                                        <Image
                                            fill
                                            loading="lazy"
                                            className="object-cover"
                                            src={category.thumnail ?? "/logo.png"}
                                            alt={category.name!}
                                            sizes="width: 100%, height: 100%"
                                        />
                                    </div>
                                </td>
                                <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                    <div className="text-gray-700 text-ellipsis overflow-hidden line-clamp-2">
                                        {category.name ?? ""}
                                    </div>
                                </td>
                                <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                    {parentCategory ?? ""}
                                </td>
                                <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                    <div className="flex flex-wrap justify-start gap-1">
                                        <button
                                            className="p-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-700 focus:outline-none"
                                            title="Edit"
                                        >
                                            <MdModeEdit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(category._id!)}
                                            className="flex items-center p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700"
                                            title="Delete"
                                        >
                                            <FaRegTrashAlt className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {/* Recursively Render List of Subcategories */}
                            {category.subcategories && <CategoryList categories={category.subcategories} currentPage={currentPage} parentCategory={category.name} />}
                        </React.Fragment>
                    );
                })
            }
        </>
    )
};

export default CategoryList