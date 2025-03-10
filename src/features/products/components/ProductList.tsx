import { useGetProducts } from "@/features/products/api/useGetProducts"
import ProductCard from "@/features/products/components/ProductCart"

export default function ProductList() {
    const {
        data: productData,
        isLoading: isProductLoading,
        isError: isProductError,
    } = useGetProducts()

    if (isProductLoading) return <div>Loading...</div>
    if (isProductError) return <div>Ops something went wrong!</div>

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-10 sm:gap-y-12 md:gap-y-14 lg:gap-y-16">
            {productData?.data.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
