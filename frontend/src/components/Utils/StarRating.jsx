/* eslint-disable react/prop-types */
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im"

const StarRating = ({ filledStars, hasHalfStar, emptyStars }) => {
   return (
      <>
         {Array.from({ length: filledStars }, (_, index) => (
            <ImStarFull key={`filled-star-${index}`} className="w-6 h-6 fill-current text-pink-500" viewBox="0 0 20 20" />
         ))}
         {hasHalfStar && (
            <ImStarHalf className="w-6 h-6 fill-current text-pink-500" viewBox="0 0 20 20" />
         )}
         {Array.from({ length: emptyStars }, (_, index) => (
            <ImStarEmpty key={`empty-star-${index}`} className="w-6 h-6 fill-current text-gray-300" viewBox="0 0 20 20" />
         ))}
      </>
   )
}

export default StarRating