import ProductCard from "@/features/products/components/ProductCart"

import type { Product } from "@/features/products/types/products"

interface ProductListProps {
    products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-10 sm:gap-y-12 md:gap-y-14 lg:gap-y-16">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
