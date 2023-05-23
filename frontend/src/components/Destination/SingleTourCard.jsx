/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import StarRating from "../Utils/StarRating";

const SingleTourCard = ({ tour }) => {
  const filledStars = Math.round(tour.ratingsAverage);
  const emptyStars = 5 - filledStars;


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
              <StarRating filledStars={filledStars} emptyStars={emptyStars} />
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