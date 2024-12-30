interface Product {
    name?: string,
    description?: string,
    price?: number,
    stock?: number,
    category?: string | {
        _id?: string,
        name?: string,
    },
    images?: string[],
    productCode?: string | {
        _id?: string,
        code?: string
    },
    options?: Variant[],
    // extras
    _id?: string,
    sold?: number,
    seller?: string,
    totalRatings?: number,
    averageRating?: number,
    remainingStock?: number,
    // ratings?: []
    brand?: string,
    createdAt?: string,
    updatedAt?: string,
    childrenCategories?: string[],
    packaging?: string,
    weight?: number,
    length?: number,
    width?: number,
    height?: number,
    information?: string,
    specifications?: string,
    ingredients?: string,
    usage?: string,
}