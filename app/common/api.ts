export const API = {
    // admin
    LOCK: "/.netlify/functions/func_getAlluser",
    UNLOCK: "/.netlify/functions/func_getAlluser",
    CREATE_USER: "/user/create",
    READ_USERS: "/.netlify/functions/func_getAlluser",
    // Common
    LOGIN: "/.netlify/functions/login",
    UPLOAD_FILE: "/files/upload/image",
    PROFILE: "/.netlify/functions/get_profile",
    // CRUD Product 
    CREATE_PRODUCT: "/.netlify/functions/create_product",
    READ_PRODUCTS: "/.netlify/functions/getlist",
    DELETE_PRODUCT: "/.netlify/functions/delete_product",
    UPDATE_PRODUCT: "/.netlify/functions/update_product",
    DETAILS_PRODUCT: "/.netlify/functions/detail_product",
    // CRUD category
    CREATE_CATEGORY: "/.netlify/functions/category_funcCreate",
    READ_CATEGORIES: "/.netlify/functions/func_allCategory",
    UPDATE_CATEGORY: "/.netlify/functions/func_updateCategory",
    DELETE_CATEGORY: "/.netlify/functions/func_delCategory",
    // CRUD Sub categories
    CREATE_SUBCATEGORIES: "/.netlify/functions/func_CreateSubcategory",
    READ_SUBCATEGORIES: "/.netlify/functions/func_getbyparentCategory",
    DELETE_SUBCATEGORIES: "/.netlify/functions/func_delSubcategory",
    UPDATE_SUBCATEGORY: "/.netlify/functions/func_UpdateSubcategory"
    ,  // 
    READ_STORAGE: "/",
    // CRUD brand
    CREATE_BRAND: "/.netlify/functions/func_createBrand",
    READ_BRANDS: "/.netlify/functions/func_allBrand",
    UPDATE_BRAND: ".netlify/functions/func_UpdateBrand",
    DELETE_BRAND: "/.netlify/functions/func_deleteBrand",
    // CONFIG
    CONFIGS: "https://learning-nestjs-ediw.onrender.com/api/v1/configs"
}