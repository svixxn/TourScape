/* eslint-disable react/prop-types */
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import { Link } from "react-router-dom"

const SingleTourCard = ({ tour }) => {
  const filledStars = Math.floor(tour.ratingsAverage);
  const hasHalfStar = tour.rating - filledStars >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);


  return (
    <Link to={`/tours/${tour.slug}`}>
      <div className="rounded overflow-hidden shadow-lg hover:bg-green-100 transition duration-100 h-full flex flex-col">
        <img className="w-full" src={tour.photo[0]} alt="..."></img>
        <div className="px-6 py-4 flex flex-col justify-between h-full">
          <div className="font-bold text-xl mb-2">{tour.name}</div>
          <p className="text-gray-700 text-base">
            {tour.summary}
          </p>
          <div className="mt-auto">
            <div className='flex flex-row gap-x-2 my-4 items-center'>
              {Array.from({ length: filledStars }, (_, index) => (
                <ImStarFull key={`filled-star-${index}`} className="w-6 h-6 fill-current text-pink-500" viewBox="0 0 20 20" />
              ))}
              {hasHalfStar && (
                <ImStarHalf className="w-6 h-6 fill-current text-pink-500" viewBox="0 0 20 20" />
              )}
              {Array.from({ length: emptyStars }, (_, index) => (
                <ImStarEmpty key={`empty-star-${index}`} className="w-6 h-6 fill-current text-gray-300" viewBox="0 0 20 20" />
              ))}

              <span className="pb-1">{tour.ratingsAverage}</span>
              <span className="pb-[0.125rem] text-gray-500 text-base">({tour.ratingQuantity} reviews)</span>
            </div>
            <div>
              From <span className="text-pink-700 font-semibold">${tour.price}</span> per person
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SingleTourCard