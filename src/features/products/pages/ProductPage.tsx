import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

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

interface ProductListProps {
    products: Product[]
}

function ProductList({ products }: ProductListProps) {
    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-10 sm:gap-y-12 md:gap-y-14 lg:gap-y-16">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

interface Product {
    id: number
    name: string
    price: number
    rating: number
    location: string
    image: string
}

interface ProductProps {
    product: Product
}

function ProductCard(props: ProductProps) {
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
                    {renderStars(product.rating)}
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

function renderStars(rating: number) {
    return Array.from({ length: 5 }, (_, i) => {
        if (i < Math.floor(rating)) {
            return <FaStar key={i} className="text-yellow-500 text-sm" />
        } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
            return <FaStarHalfAlt key={i} className="text-yellow-500 text-sm" />
        } else {
            return <FaRegStar key={i} className="text-gray-500 text-sm" />
        }
    })
}

const products: Product[] = [
    {
        id: 1,
        name: "Wireless Noise-Canceling Over-Ear Headphones with 40-Hour Battery Life",
        price: 99.99,
        rating: 4.5,
        location: "New York, USA",
        image: "https://picsum.photos/400/500?random=1",
    },
    {
        id: 2,
        name: "Flagship 5G Smartphone with 120Hz AMOLED Display and 108MP Camera",
        price: 699.99,
        rating: 4.8,
        location: "San Francisco, USA",
        image: "https://picsum.photos/400/500?random=2",
    },
    {
        id: 3,
        name: "High-Performance Gaming Laptop with RTX 4080 Graphics and Liquid Cooling",
        price: 1299.99,
        rating: 4.7,
        location: "Los Angeles, USA",
        image: "https://picsum.photos/400/500?random=3",
    },
    {
        id: 4,
        name: "Smartwatch with AMOLED Display, GPS, Heart Rate Monitor, and Sleep Tracking",
        price: 199.99,
        rating: 4.2,
        location: "Chicago, USA",
        image: "https://picsum.photos/400/500?random=4",
    },
    {
        id: 5,
        name: "Mechanical Keyboard with Hot-Swappable Switches, RGB Lighting, and PBT Keycaps",
        price: 89.99,
        rating: 4.6,
        location: "Austin, USA",
        image: "https://picsum.photos/400/500?random=5",
    },
    {
        id: 6,
        name: "Ultrawide Monitor",
        price: 399.99,
        rating: 4.9,
        location: "Miami, USA",
        image: "https://picsum.photos/400/500?random=6",
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        price: 59.99,
        rating: 4.3,
        location: "Seattle, USA",
        image: "https://picsum.photos/400/500?random=7",
    },
    {
        id: 8,
        name: "External Hard Drive",
        price: 129.99,
        rating: 4.4,
        location: "Boston, USA",
        image: "https://picsum.photos/400/500?random=8",
    },
    {
        id: 9,
        name: "Drone",
        price: 499.99,
        rating: 4.7,
        location: "Denver, USA",
        image: "https://picsum.photos/400/500?random=9",
    },
    {
        id: 10,
        name: "Est nisi nisi est id nulla nisi ullamco excepteur id consectetur commodo ut. Ipsum aliquip mollit in elit et elit excepteur magna ex cillum. Sunt reprehenderit pariatur velit nostrud.",
        price: 899.99,
        rating: 4.5,
        location: "Dallas, USA",
        image: "https://picsum.photos/400/500?random=10",
    },
    {
        id: 11,
        name: "Coffee Machine",
        price: 149.99,
        rating: 4.6,
        location: "Atlanta, USA",
        image: "https://picsum.photos/400/500?random=11",
    },
    {
        id: 12,
        name: "Noise Cancelling Earbuds",
        price: 129.99,
        rating: 4.8,
        location: "Portland, USA",
        image: "https://picsum.photos/400/500?random=12",
    },
    {
        id: 13,
        name: "Smart Home Assistant",
        price: 79.99,
        rating: 4.5,
        location: "Las Vegas, USA",
        image: "https://picsum.photos/400/500?random=13",
    },
]
