// import { useGetCategories } from "@/features/products/api/useGetCategories"
import FilterProduct from "@/features/products/components/FilterProduct"
import ProductList from "@/features/products/components/ProductList"
import { products } from "@/features/products/data/products"
import { Separator } from "@/components/ui/separator"

export default function ProductPage() {
    // const {
    //     data: categoryData,
    //     isLoading: isCategoryLoading,
    //     isError: isCategoryError,
    //     error: categoryError,
    // } = useGetCategories()

    return (
        <div>
            <main className="flex flex-col rounded-md">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Products
                </h2>
                <Separator className="my-4" />
                <FilterProduct />
                <ProductList products={products} />
            </main>
        </div>
    )
}
