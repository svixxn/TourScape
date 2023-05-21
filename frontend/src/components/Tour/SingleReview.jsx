import { useState } from "react";
import StarRating from "../Utils/StarRating";

/* eslint-disable react/prop-types */
const SingleReview = ({ review }) => {
   const filledStars = Math.floor(review.rating);
   const hasHalfStar = review.rating - filledStars >= 0.5;
   const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
   const [isEditing, setIsEditing] = useState(false)

   const createdAt = new Date(review.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

   return (
      <div className="flex flex-col w-full border-l-2 border-gray-300 p-6 mt-4 md:mt-0">
         <div className="flex items-center justify-between">
            <div className="flex items-center">
               <img className="h-10 w-10 rounded-full mr-2" src={review.user.photo} alt={review.user.name} />
               <span className="font-bold">{review.user.name}</span>
            </div>
            <span className="font-light">{createdAt}</span>
         </div>
         <div className='flex gap-5 my-2'>
            <StarRating filledStars={filledStars} hasHalfStar={hasHalfStar} emptyStars={emptyStars} />
         </div>
         <div className="text-left italic mt-2">{review.review}</div>
      </div>
   );
};

export default SingleReview;
