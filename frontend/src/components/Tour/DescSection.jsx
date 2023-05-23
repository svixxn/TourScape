/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import StarRating from '../Utils/StarRating'
import { FaWallet } from 'react-icons/fa'

const DescSection = ({ tour, filledStars,emptyStars }) => {
   return <>
      <h1 className='text-4xl text-primary font-bold'>{tour.name}</h1>

      <h3 className='text-gray-500 py-3'>By Tours in
         <Link to={`/destinations/${tour.destination.toLowerCase()}`}><span className='underline'> {tour.destination}</span></Link>
      </h3>
      <div className='flex flex-row gap-x-2 my-4 items-center'>
         <StarRating filledStars={filledStars} emptyStars={emptyStars} />
         <span className="pb-1">{tour.ratingsAverage}</span>
         <span className="pb-[0.125rem] text-gray-500 text-base">({tour.ratingQuantity} reviews)</span>
      </div>

      <p className='font-normal'>{tour.description}</p>

      <div className="flex flex-row mt-5 gap-2 text-lg underline items-center">
         <FaWallet className='text-pink-600' />
         <span>Lowest price guarantee &#8226;</span>
         <span>Reserve now & pay later &#8226;</span>
         <span>Free cancellation</span>
      </div>
   </>
}

export default DescSection