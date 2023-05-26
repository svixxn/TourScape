import { useState } from "react";
import StarRating from "../Utils/StarRating";
import Toast from "../Utils/Toast";
import { TourState } from "../../context/TourProvider";
import axios from "axios";
import { FiEdit2 } from 'react-icons/fi'
import { AiFillDelete, AiOutlineCheck } from 'react-icons/ai'
import { RotatingLines } from "react-loader-spinner";
import StarRatingButtons from "../Utils/StarRatingButtons";

/* eslint-disable react/prop-types */
const SingleReview = ({ review, fetchReviews }) => {
   const { user } = TourState()
   const filledStars = Math.round(review.rating);
   const emptyStars = 5 - filledStars;
   const [isEditing, setIsEditing] = useState(false)
   const [reviewEdited, setReviewEdited] = useState(review.review)
   const [ratingEdited, setRatingEdited] = useState(review.rating)
   const [isLoading, setIsLoading] = useState(false);

   const fetchReviewsAfterChange = () => {
      setIsLoading(true)
      fetchReviews()
      setIsLoading(false)
   }

   const setRatingStars = (stars) => {
      setRatingEdited(stars)
   }

   const handleDelete = async () => {
      try {
         if (!user) return;
         if (review.user._id == user._id || user.role == "admin") {
            const config = {
               headers: {
                  "Content-type": "application/json",
               },
            };
            await axios.delete(
               `/api/reviews/${review._id}`,
               config
            );
            fetchReviewsAfterChange();
            Toast({ type: "success", message: `Review was deleted.`, duration: 2000 });
         }
      } catch (err) {
         Toast({ type: "error", message: `${err.response.data.message}`, duration: 2000 });
      }
   }


   const handleSubmitEdit = async () => {
      try {
         if (!user) return;
         if (review.user._id != user._id) return;
         if (!reviewEdited && !ratingEdited) return;
         setIsEditing(prevState => !prevState)

         const config = {
            headers: {
               "Content-type": "application/json",
            },
         };
         await axios.patch(
            `/api/reviews/${review._id}`,
            { review: reviewEdited, rating: ratingEdited },
            config
         );
         fetchReviewsAfterChange();
         Toast({ type: "success", message: `Review was edited.`, duration: 2000 });
      } catch (err) {
         Toast({ type: "error", message: `${err.response.data.message}`, duration: 2000 });
      }
   }

   const createdAt = new Date(review.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

   if (isLoading) return
   <div className="flex flex-row items-center justify-center my-4">
      <RotatingLines
         strokeColor="pink"
         strokeWidth="5"
         animationDuration="0.75"
         width="42"
         visible={true}
      />
   </div>

   const handleEditing = () => {
      setIsEditing(prevState => !prevState)
   }


   return (
      <div className="flex flex-col w-full border-l-2 border-gray-300 p-6 mt-4 md:mt-0 shadow-xl">
         <div className="flex items-center justify-between">
            <div className="flex items-center">
               <img className="h-10 w-10 rounded-full mr-2" src={review.user.photo} alt={review.user.name} />
               <span className="font-bold">{review.user.name}</span>
            </div>
            <div className="flex flex-row items-center gap-2">
               {user?._id === review.user._id && (
                  <div className="flex flex-row gap-1">
                     <button className={`p-4 rounded-xl hover:bg-yellow-300 text-black transition-all border-2 border-gray-300 ${isEditing && 'bg-yellow-300 animate-pulse'}`} onClick={handleEditing}>
                        <FiEdit2 />
                     </button>
                     <button className="p-4 rounded-xl hover:bg-red-600 text-black transition-all border-2 border-gray-300" onClick={handleDelete}>
                        <AiFillDelete />
                     </button>
                  </div>
               )}
               {user?.role === "admin" && (
                  <button className="p-4 rounded-xl hover:bg-red-600 text-black transition-all border-2 border-gray-300" onClick={handleDelete}>
                     <AiFillDelete />
                  </button>
               )}
               <span className="font-light">{createdAt}</span>
            </div>
         </div>
         {isEditing ? (
            <StarRatingButtons rating={ratingEdited} setRating={setRatingStars} size={10} />
         ) : (
            <div className='flex gap-5 my-2'>
               <StarRating filledStars={filledStars} emptyStars={emptyStars} />
            </div>
         )}

         {isEditing ? (
            <div className="mt-2">
               <input className="w-full p-4 border-2 rounded-xl focus:outline-none focus:border-pink-600 transition-all" onChange={(e) => setReviewEdited(e.target.value)} defaultValue={review.review} />
               <button className="p-4 rounded-xl mt-2 hover:bg-green-500 text-black transition-all border-2 border-gray-300" onClick={handleSubmitEdit}>
                  <AiOutlineCheck />
               </button>
            </div>
         ) : (<div className="text-left italic mt-2">{review.review}</div>)}
      </div>
   );
};

export default SingleReview;
