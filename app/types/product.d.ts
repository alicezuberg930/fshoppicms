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