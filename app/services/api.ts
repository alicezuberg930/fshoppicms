import axios, { AxiosError, AxiosHeaders } from "axios";
import instance from "../configs/axios.config"
import { auth } from "../configs/auth.config";

// người dùng
export const login = async (phone: string, password: string) => {
    try {
        let response = await instance<any>({ url: "/user/login", method: "POST", data: { phone, password } })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data.error
        }
    }
}

export const getProfile = async (token: string) => {
    try {
        let response = await instance<User>({
            url: "/user/profile", method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data.error
        }
    }
}

// sản phẩm
export const getProducts = async (token: string, filter?: FilterProducts) => {
    try {
        let response = await instance<any>({
            url: "/product/get_list", method: "GET", data: { filter },
            headers: { Authorization: `Bearer ${token}` },
            id: "product-get_list"
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data.error
        }
    }
}

export const createProduct = async (token: string, product: Product) => {
    try {
        let response = await instance<any>({
            url: "/product/create", method: "POST",
            data: product,
            headers: { Authorization: `Bearer ${token}` },
            cache: {
                update: {
                    // Internally calls the storage.remove('/product/get_list') and lets the
                    // next request be forwarded to the server without you having to do any checks.
                    'product-get_list': 'delete'
                }
            }
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data.error
        }
    }
}

export const updateProduct = async (token: string, id: string, product: Product) => {
    try {
        let response = await instance<Product>({
            url: `/product/update/${id}`, method: "PUT", data: product,
            headers: { Authorization: `Bearer ${token}` },
            cache: {
                update: {
                    // Internally calls the storage.remove('/product/get_list') and lets the
                    // next request be forwarded to the server without you having to do any checks.
                    'product-get_list': 'delete'
                }
            }
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data.error
        }
    }
}

export const deleteProduct = async (token: string, id: string) => {
    try {
        let response = await instance<any>({
            url: `/product/delete/${id}`, method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            cache: {
                update: {
                    // Internally calls the storage.remove('/product/get_list') and lets the
                    // next request be forwarded to the server without you having to do any checks.
                    'product-get_list': 'delete'
                }
            }
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data.error
        }
    }
}

// admin 
export const lockAccount = async (token: string, lockReason: string) => {
    try {
        let response = await instance<Category>({
            url: "/admin/lock", method: "POST", data: { lockReason },
            headers: { Authorization: `Bearer ${token}` },
            cache: {
                update: {
                    // Internally calls the storage.remove('/product/get_list') and lets the
                    // next request be forwarded to the server without you having to do any checks.
                    'admin-getUsers': 'delete'
                }
            }
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data.error
        }
    }
}

export const unlockAccount = async (token: string, lockReason: string) => {
    try {
        let response = await instance<Category>({
            url: "/admin/unlock", method: "POST", data: { lockReason },
            headers: { Authorization: `Bearer ${token}` },
            cache: {
                update: {
                    // Internally calls the storage.remove('/product/get_list') and lets the
                    // next request be forwarded to the server without you having to do any checks.
                    'admin-getUsers': 'delete'
                }
            }
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data.error
        }
    }
}

export const createUser = async (token: string, user: User) => {
    try {
        let response = await instance<any>({
            url: "/user/create", method: "POST", data: user,
            headers: { Authorization: `Bearer ${token}` },
            cache: {
                update: {
                    // Internally calls the storage.remove('/admin/getUsers') and lets the
                    // next request be forwarded to the server without you having to do any checks.
                    'admin-getUsers': 'delete'
                }
            }
        })
        return response.data
    } catch (error) {
        return error
    }
}

export const getUsers = async (token: string) => {
    try {
        let response = await instance<any>({
            url: "/admin/getUsers", method: "GET", data: {},
            headers: { Authorization: `Bearer ${token}` },
            id: "admin-getUsers"
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data.error
        }
    }
}

// danh mục
export const getCategories = async (token: string) => {
    return await instance<any>({
        url: "/category/all", method: "GET", data: {},
        headers: { Authorization: `Bearer ${token}` },
        id: "category-all"
    })
}

export const createCategory = async (token: string, category: Category) => {
    return await instance<any>({
        url: "/category/create", method: "POST", data: category,
        headers: { Authorization: `Bearer ${token}` },
        cache: {
            update: {
                // Internally calls the storage.remove('/category/all') and lets the
                // next request be forwarded to the server without you having to do any checks.
                'category-all': 'delete'
            }
        }
    })
}

export const deleteCategory = async (token: string, id: string) => {
    return await instance<any>({
        url: `/category/del/${id}`, method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        cache: {
            update: {
                // Internally calls the storage.remove('/category/all') and lets the
                // next request be forwarded to the server without you having to do any checks.
                'category-all': 'delete'
            }
        }
    })
}