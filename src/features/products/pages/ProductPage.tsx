import ProductList from "@/features/products/components/ProductList"
import { products } from "@/features/products/data/products"
import { Separator } from "@/components/ui/separator"

export default function ProductPage() {

    return (
        <div>
            <main className="flex flex-col rounded-md">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Products
                </h2>
                <Separator className="my-4" />
                <ProductList products={products} />
            </main>
        </div>
    )
}
