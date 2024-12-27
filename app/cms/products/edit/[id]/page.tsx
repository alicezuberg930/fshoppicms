import ProductModal from "@/app/components/ProductModal"

const EditProductPage: React.FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
    const id = (await params).id

    return (<ProductModal page={1} />)
}

export default EditProductPage