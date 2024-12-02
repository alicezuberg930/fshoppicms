import axios from "axios";
import instance from "../configs/axios.config"
import { API } from "../common/path";

// common
export const uploadFile = async (token: string, file: FormData) => {
    return await instance<any>({
        url: API.UPLOAD_FILE, method: "POST", data: file,
        headers: { Authorization: `Bearer ${token}` }
    })
}

// người dùng
export const login = async (phone: string, password: string) => {
    try {
        let response = await instance<any>({ url: API.LOGIN, method: "POST", data: { phone, password } })
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
            url: API.PROFILE, method: "GET",
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
            url: API.READ_PRODUCTS, method: "GET", data: { filter },
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
            url: API.CREATE_PRODUCT, method: "POST",
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
            url: `${API.UPDATE_PRODUCT}/${id}`, method: "PUT", data: product,
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
        const response = await instance<any>({
            url: `${API.DELETE_PRODUCT}/${id}`, method: "DELETE",
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
        const response = await instance<Category>({
            url: API.LOCK, method: "POST", data: { lockReason },
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
            url: API.UNLOCK, method: "POST", data: { lockReason },
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
        const response = await instance<any>({
            url: API.CREATE_USER, method: "POST", data: user,
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
        const response = await instance<any>({
            url: API.READ_USER, method: "GET", data: {},
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
        url: API.READ_CATEGORIES, method: "GET", data: {},
        headers: { Authorization: `Bearer ${token}` },
        id: API.READ_CATEGORIES
    })
}

export const createCategory = async (token: string, category: Category) => {
    return await instance<any>({
        url: API.CREATE_CATEGORY, method: "POST", data: category,
        headers: { Authorization: `Bearer ${token}` },
        cache: {
            update: {
                // Internally calls the storage.remove('/category/all') and lets the
                // next request be forwarded to the server without you having to do any checks.
                "/category/all": 'delete'
            }
        }
    })
}

export const deleteCategory = async (token: string, id: string) => {
    return await instance<any>({
        url: `${API.DELETE_CATEGORY}/${id}`, method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        cache: {
            update: {
                // Internally calls the storage.remove('/category/all') and lets the
                // next request be forwarded to the server without you having to do any checks.
                '/category/all': 'delete'
            }
        }
    })
}