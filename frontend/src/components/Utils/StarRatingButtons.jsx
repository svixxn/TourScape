/* eslint-disable react/prop-types */
import { ImStarEmpty, ImStarFull } from "react-icons/im"

const StarRatingButtons = ({ rating, setRating, size }) => {
   return (
      <div className="flex flex-row gap-5 items-center">
         {[1, 2, 3, 4, 5].map((star) => (
            <span
               key={star}
               className="cursor-pointer"
               onClick={() => setRating(star)}
            >
               {star <= rating ? (
                  <ImStarFull className={`w-${size} h-${size} fill-current text-pink-500`} viewBox="0 0 20 20" />
               ) : (
                  <ImStarEmpty className={`w-${size} h-${size} fill-current text-gray-300`} viewBox="0 0 20 20" />
               )}
            </span>
         ))}
      </div>
   )
}

export default StarRatingButtons