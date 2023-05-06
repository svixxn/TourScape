/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { ImStarFull, ImStarHalf, ImStarEmpty } from 'react-icons/im'
import axios from 'axios'

const SingleReview = ({ review }) => {
   const filledStars = Math.floor(review.rating);
   const hasHalfStar = review.rating - filledStars >= 0.5;
   const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
   const [reviewOn, setReviewOn] = useState("");

   useEffect(() => {
      let reviewOnType;
      if(review.tour) {
         reviewOnType = "tours"
         review.dest = review.tour
      }
      else if(review.hotel){
         reviewOnType = "hotels"
         review.dest = review.hotel
      } 
      else{
         reviewOnType = "restaurants"
         review.dest = review.restaurant
      } 

      (async () => {
         try {
            const config = {
               headers: {
                  "Content-type": "application/json",
               },
            };
            const { data } = await axios.get(
               `/api/${reviewOnType}/${review.dest}`,
               config
            );
            setReviewOn(data.data.data)
         } catch (error) {
            console.log(error)
         }
      })();
   }, [review])

   if (!reviewOn) return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    )


   review.createdAt = (new Date(review.createdAt)).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
   return (
      <div className="flex flex-col w-[30rem] border-2 border-neutral-800 rounded-xl p-4 mt-4 md:mt-0">
         <div className="flex items-center justify-between">
            <div className="flex items-center">
               <img className="h-10 w-10 rounded-full mr-2" src={review.user.photo} alt={review.user.name} />
               <span className="font-bold">{review.user.name}</span>
            </div>
            <span className="font-light">{review.createdAt}</span>
         </div>
         <div className='flex gap-5 my-2'>
            {Array.from({ length: filledStars }, (_, index) => (
               <ImStarFull key={`filled-star-${index}`} className="w-6 h-6 fill-current text-pink-500" viewBox="0 0 20 20" />
            ))}
            {hasHalfStar && (
               <ImStarHalf className="w-6 h-6 fill-current text-pink-500" viewBox="0 0 20 20" />
            )}
            {Array.from({ length: emptyStars }, (_, index) => (
               <ImStarEmpty key={`empty-star-${index}`} className="w-6 h-6 fill-current text-gray-300" viewBox="0 0 20 20" />
            ))}
         </div>
         <div className='text-left'>Review on:
            <span className='font-bold ml-1'>
               {reviewOn.name}
            </span>
         </div>
         <div className="text-left italic mt-2">{review.review}</div>
      </div>
   )
}

export default SingleReview