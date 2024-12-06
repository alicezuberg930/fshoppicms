import axioInstance from "../configs/axios.config"
import { API } from "../common/api";
// common
export const uploadFile = async (token: string, file: FormData) => {
    return await axioInstance<any>({
        url: API.UPLOAD_FILE, method: "POST", data: file,
        headers: { Authorization: `Bearer ${token}` }
    })
}

// người dùng
export const login = async (phone: string, password: string) => {
    return await axioInstance({ url: API.LOGIN, method: "POST", data: { phone, password } }).then(res => res.data)
}

export const getProfile = async (token: string) => {
    return await axioInstance<any>({ url: API.PROFILE, method: "GET", headers: { Authorization: `Bearer ${token}` } }).then(res => res.data)
}

// sản phẩm
export const getProducts = async (token: string, filter?: FilterProducts) => {
    return await axioInstance<any>({
        url: API.READ_PRODUCTS, method: "GET", params: filter,
        headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.data)
}

export const createProduct = async (token: string, product: Product) => {
    return await axioInstance<any>({
        url: API.CREATE_PRODUCT, method: "POST",
        data: product,
        headers: { Authorization: `Bearer ${token}` },
    })
}

export const updateProduct = async (token: string, id: string, product: Product) => {
    return await axioInstance<any>({
        url: `${API.UPDATE_PRODUCT}/${id}`, method: "PUT", data: product,
        headers: { Authorization: `Bearer ${token}` },
    })
}

export const deleteProduct = async (token: string, id: string) => {
    return await axioInstance<any>({
        url: `${API.DELETE_PRODUCT}/${id}`, method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    })
}

// admin 
export const lockAccount = async (token: string, lockReason: string) => {
    return await axioInstance<any>({
        url: API.LOCK, method: "POST", data: { lockReason },
        headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.data)
}

export const unlockAccount = async (token: string, lockReason: string) => {
    return await axioInstance<any>({
        url: API.UNLOCK, method: "POST", data: { lockReason },
        headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.data)
}

export const getUsers = async (token: string, filter?: FilterUsers) => {
    return await axioInstance<any>({
        url: API.READ_USERS, method: "GET", params: filter,
        headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.data)
}

export const createUser = async (token: string, user: User) => {
    return await axioInstance<any>({
        url: API.CREATE_USER, method: "POST", data: user,
        headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.data)
}

// danh mục
export const getCategories = async (token: string) => {
    return await axioInstance<any>({
        url: API.READ_CATEGORIES, method: "GET", data: {},
        headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.data)
}

export const createCategory = async (token: string, category: Category) => {
    return await axioInstance<any>({
        url: API.CREATE_CATEGORY, method: "POST", data: category,
        headers: { Authorization: `Bearer ${token}` },
    })
}

export const deleteCategory = async (token: string, id: string) => {
    return await axioInstance<any>({
        url: `${API.DELETE_CATEGORY}/${id}`, method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    })
}