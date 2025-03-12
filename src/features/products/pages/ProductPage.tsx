import FilterProduct from "@/features/products/components/FilterProduct"
import ProductList from "@/features/products/components/ProductList"
import { Separator } from "@/components/ui/separator"

export default function ProductPage() {
    return (
        <main className="flex flex-col rounded-md">
            <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
            <Separator className="my-4" />
            <FilterProduct />
            <ProductList />
        </main>
    )
}
