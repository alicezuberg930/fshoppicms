import ProductModal from "@/app/components/ProductModal"
import { detailsProduct } from "@/app/services/api.service"

const EditProductPage: React.FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
    const id = (await params).id
    const response = await detailsProduct(id)
    const product: Product = response.product.product

    return (<ProductModal page={1} product={product} />)
}

export default EditProductPage