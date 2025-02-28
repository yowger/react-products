import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

interface StarRatingProps {
    rating: number
}

export default function RenderStars(props: StarRatingProps) {
    const { rating } = props

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
