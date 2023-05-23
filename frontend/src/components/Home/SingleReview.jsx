/* eslint-disable react/prop-types */
import StarRating from '../Utils/StarRating';

const SingleReview = ({ review }) => {
   const filledStars = Math.round(review.rating);
   const emptyStars = 5 - filledStars;




   review.createdAt = (new Date(review.createdAt)).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
   return (
      <div className="flex flex-col w-[30rem] border-2 border-neutral-500 rounded-xl p-4 md:mt-0 shadow-2xl">
         <div className="flex items-center justify-between">
            <div className="flex items-center">
               <img className="h-10 w-10 rounded-full mr-2" src={review.user.photo} alt={review.user.name} />
               <span className="font-bold">{review.user.name}</span>
            </div>
            <span className="font-light">{review.createdAt}</span>
         </div>
         <div className='flex gap-5 my-2'>
            <StarRating filledStars={filledStars} emptyStars={emptyStars} />
         </div>
         <div className="text-left italic mt-2">{review.review}</div>
      </div>
   )
}

export default SingleReview