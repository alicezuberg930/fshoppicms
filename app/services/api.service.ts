import axioInstance from "../configs/axios.config"
import { API } from "../common/api";
import axios from "axios";

// common
export const uploadFile = async (file: FormData) => {
    return await axioInstance<any>({
        url: API.UPLOAD_FILE, method: "POST", data: file,
    }).then(res => res.data)
}

// người dùng
export const login = async (phone: string, password: string) => {
    return await axioInstance({
        url: API.LOGIN, method: "POST",
        data: { phone, password }
    }).then(res => res.data)
}

export const getProfile = async (token: string) => {
    return await axioInstance<any>({
        url: API.PROFILE, method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data)
}

// sản phẩm
export const getProducts = async (filter?: FilterProducts) => {
    return await axioInstance<any>({
        url: API.READ_PRODUCTS, method: "GET", params: filter,
    }).then(res => res.data)
}

export const createProduct = async (product: Product) => {
    return await axioInstance<any>({
        url: API.CREATE_PRODUCT, method: "POST",
        data: product,
    })
}

export const updateProduct = async (id: string, product: Product) => {
    return await axioInstance<any>({
        url: `${API.UPDATE_PRODUCT}/${id}`, method: "PUT", data: product,
    })
}

export const deleteProduct = async (id: string) => {
    return await axioInstance<any>({
        url: `${API.DELETE_PRODUCT}/${id}`, method: "DELETE",
    })
}

// admin 
export const lockAccount = async (lockReason: string) => {
    return await axioInstance<any>({
        url: API.LOCK, method: "POST", data: { lockReason },
    }).then(res => res.data)
}

export const unlockAccount = async (lockReason: string) => {
    return await axioInstance<any>({
        url: API.UNLOCK, method: "POST", data: { lockReason },
    }).then(res => res.data)
}

export const getUsers = async (filter?: FilterUsers) => {
    return await axioInstance<any>({
        url: API.READ_USERS, method: "GET", params: filter
    }).then(res => res.data)
}

export const createUser = async (user: User) => {
    return await axioInstance<any>({
        url: API.CREATE_USER, method: "POST", data: user,
    }).then(res => res.data)
}

// danh mục
export const getCategories = async () => {
    return await axioInstance<any>({
        url: API.READ_CATEGORIES, method: "GET", data: {},
    }).then(res => res.data)
}

export const createCategory = async (category: Category) => {
    return await axioInstance<any>({
        url: API.CREATE_CATEGORY, method: "POST", data: category,
    }).then(res => res.data)
}

export const deleteCategory = async (id: string) => {
    return await axioInstance<any>({
        url: `${API.DELETE_CATEGORY}/${id}`, method: "DELETE",
    }).then(res => res.data)
}

// site config
export const getSiteConfigs = async () => {
    return await axios<SingleAPIResponse<Config>>({
        url: "https://learning-nestjs-ediw.onrender.com/api/v1/configs", method: "GET",
    }).then(res => res.data)
}

export const updateSiteConfigs = async (config: Config) => {
    return await axioInstance<SingleAPIResponse<Config>>({
        url: "https://learning-nestjs-ediw.onrender.com/api/v1/configs", method: "POST", data: config,
    }).then(res => res.data)
}