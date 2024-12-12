"use client"
import { FormEvent } from "react"
import { createUserHook } from "@/app/hooks/user.hooks"

const CreateUserPage: React.FC = () => {
    const mutation = createUserHook()

    const handleCreateUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const user: User = Object.fromEntries(formData.entries()); // Convert FormData to an object
        mutation.mutate({ user });
    }

    return (
        <div className='w-full table-auto'>
            <div className='text-black'>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>Thêm người dùng</h3>
                </div>
                <div className='p-3'>
                    <form onSubmit={(e) => handleCreateUser(e)}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Thông tin người dùng</td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-1 whitespace-nowrap'>Tên<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name="name" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-1 whitespace-nowrap'>Email<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name="email" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-1 whitespace-nowrap'>Mật khẩu<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name="password" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-1 whitespace-nowrap'>Xác nhận mật khẩu<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name="confirmPassword" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-1 whitespace-nowrap'>Số điện thoại<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name="phone" />
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <div className='space-x-3 font-bold text-md'>
                                            <input type='submit' className='bg-[#347ab6] p-3 rounded-md text-white outline-none' value='Xác Nhận' />
                                            <input type='reset' className='bg-[#eeeeee] p-3 rounded-md outline-none' value='Nhập Lại' />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUserPage