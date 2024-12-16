interface User {
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    phone?: string,
    // extras
    _id?: string,
    isAdmin?: boolean,
    role?: string,
    isLocked?: boolean,
    // orders: []
    createdAt?: string,
    updatedAt?: string,
    access_token?: string
}

interface Variant {
    key: string,
    value: {
        val: string,
        quantity: number,
        _id?: string
    }[],
    _id?: string
}

interface Product {
    name?: string,
    description?: string,
    price?: number,
    stock?: number,
    category?: string,
    images?: string[],
    productCode?: string,
    options?: Variant[],
    // extras
    _id?: string,
    sold?: number,
    seller?: string,
    totalRatings?: number,
    averageRating?: number,
    remainingStock?: number,
    // ratings?: []
    createdAt?: string,
    updatedAt?: string,
}

interface Category {
    _id?: string,
    name?: string,
    description?: string,
    parentCategory?: string | null,
    subcategories?: Category[],
    thumnail?: string | null,
}

interface FilterProducts {
    priceMax?: number,
    search?: string,
    category?: string,
    priceMin?: number,
    page?: number,
}

interface FilterUsers {
    page: number
}

interface ArrayAPIResponse<Type> {
    status: string,
    statusCode: number,
    message: string,
    data?: {
        data?: Type,
        total?: number,
        totalPages?: number,
        currentPage?: number
    }
}

interface SingleAPIResponse<Type> {
    status?: string,
    statusCode?: number,
    message?: string,
    data?: Type
}
