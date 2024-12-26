import axioInstance, { instanceWithoutToken } from "../configs/axios.config"
import { API } from "../common/api";
import axios from "axios";

// common
export const uploadFile = async (file: FormData) => {
    return await axios({
        url: `https://future-be.onrender.com${API.UPLOAD_FILE}`, method: "POST", data: file,
        headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDM1N2E5MTZiMzI0YTU1ZGVhNzA2ZiIsInBob25lIjoiMDkwMTIzNDU2OSIsImlhdCI6MTczNDk0MzIzM30.S4-v5VBB4YceUYy8oai7Wy-vKLC9SDJCuv_8LAiseG8" }
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
        url: API.READ_PRODUCTS, method: "GET", params: filter
    }).then(res => res.data)
}

export const createProduct = async (product: Product) => {
    return await axioInstance<any>({
        url: API.CREATE_PRODUCT, method: "POST", data: product
    }).then(res => res.data)
}

export const updateProduct = async (id: string, product: Product) => {
    return await axioInstance<any>({
        url: `${API.UPDATE_PRODUCT}`, params: { id }, method: "PUT", data: product,
    }).then(res => res.data)
}

export const deleteProduct = async (id: string) => {
    return await axioInstance<any>({
        url: `${API.DELETE_PRODUCT}`, params: { id }, method: "DELETE",
    }).then(res => res.data)
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
    return await instanceWithoutToken<any>({
        url: API.READ_CATEGORIES, method: "GET",
    }).then(res => res.data)
}

export const createCategory = async (category: Category) => {
    return await axioInstance<any>({
        url: API.CREATE_CATEGORY, method: "POST", data: category,
    }).then(res => res.data)
}

export const updateCategory = async (id: string, category: Category) => {
    return await axioInstance<any>({
        url: API.UPDATE_CATEGORY, method: "PUT", params: { id }, data: category,
    }).then(res => res.data)
}

export const deleteCategory = async (id: string) => {
    return await axioInstance<any>({
        url: `${API.DELETE_CATEGORY}`, params: { id }, method: "DELETE",
    }).then(res => res.data)
}
// danh mục con
export const getSubCategories = async (id: string) => {
    return await axioInstance<any>({
        url: API.READ_SUBCATEGORIES, method: "GET", params: { id },
    }).then(res => res.data)
}

export const createSubCategory = async (category: Category) => {
    return await axioInstance<any>({
        url: API.CREATE_SUBCATEGORIES, method: "POST", data: category,
    }).then(res => res.data)
}

// Cấu hình trang
export const getSiteConfigs = async () => {
    return await axios<SingleAPIResponse<Config>>({
        url: API.CONFIGS, method: "GET",
    }).then(res => res.data)
}

export const updateSiteConfigs = async (config: Config) => {
    return await axioInstance<SingleAPIResponse<Config>>({
        url: API.CONFIGS, method: "POST", data: config,
    }).then(res => res.data)
}

// Thương hiệu
export const createBrand = async (brand: Brand) => {
    return await axioInstance<any>({
        url: API.CREATE_BRAND, method: "POST", data: brand,
    }).then(res => res.data)
}

export const updateBrand = async (id: string, brand: Brand) => {
    console.log({ id });

    return await axioInstance<any>({
        url: API.UPDATE_BRAND, method: "PUT", params: { id }, data: brand
    }).then(res => res.data)
}

export const deleteBrand = async (id: string) => {
    return await axioInstance<any>({
        url: API.DELETE_BRAND, method: "DELETE", params: { id },
    }).then(res => res.data)
}

export const getBrands = async () => {
    return await instanceWithoutToken<any>({
        url: API.READ_BRANDS, method: "GET",
    }).then(res => res.data)
}