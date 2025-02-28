import RenderStars from "@/features/products/components/RenderStars"

import type { Product } from "@/features/products/types/products"

interface ProductProps {
    product: Product
}

export default function ProductCard(props: ProductProps) {
    const { product } = props

    return (
        <div className="flex flex-col rounded-md cursor-pointer p-4 hover:shadow-lg transition-shadow duration-500">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-xs"
                loading="lazy"
            />
            <div className="flex flex-col gap-1 mt-2 h-full">
                <h3 className="font-medium mt-1 text-gray-900 line-clamp-2">
                    {product.name}
                </h3>

                <div className="flex items-center space-x-1 text-yellow-500">
                    <RenderStars rating={product.rating} />

                    <span className="text-gray-600 text-sm ml-1">
                        {product.rating}
                    </span>
                </div>

                <p className="font-semibold text-gray-800">
                    ${product.price.toFixed(2)}
                </p>

                <div className="grow" />

                <p className="text-gray-600 text-xs line-clamp-1">
                    {product.location}
                </p>
            </div>
        </div>
    )
}
