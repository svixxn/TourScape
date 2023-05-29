/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner"
import SingleReview from "./SingleReview";
import Toast from "../Utils/Toast";
import StarRatingButtons from "../Utils/StarRatingButtons";
import LineWithText from "../Utils/LineWithText";

const ReviewsSection = ({ tour }) => {
   const authToken = Cookies.get('_auth');
   const [reviews, setReviews] = useState([]);
   const [reviewCurrent, setReviewCurrent] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [rating, setRating] = useState(3)
   

   const setRatingStars = (stars) => {
      setRating(stars)
   }

   const fetchReviews = useCallback(async () => {
      try {
         const { data } = await axios.get(`/api/tours/${tour._id}/reviews`);
         setReviews(data.data.data);
      } catch (err) {
         console.log(err);
      }
   }, [tour._id]);

   useEffect(() => {
      fetchReviews();
   }, [fetchReviews]);

   const handleAddReview = async () => {
      if(!authToken){
         Toast({ type: "error", message: `You're not logged in.`, duration: 2000 });
         return;
      }
      try {
         if (!reviewCurrent) {
            Toast({ type: "warning", message: "Empty review!", duration: 1000 });
            return;
         }
         setIsLoading(true);
         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${authToken}`,
            },
         };

         await axios.post(`/api/tours/${tour._id}/reviews`, {
            review: reviewCurrent,
            rating
         }, config);
         await fetchReviews();
         Toast({ type: "success", message: "Review Added Successfully", duration: 1000 });

      } catch (error) {
         Toast({ type: "error", message: `${error.response.data.message}`, duration: 2000 });
      }
      setReviewCurrent("");
      setRating(3)
      setIsLoading(false);
   }
   return (
      <>
         <div className='flex flex-col items-center mb-6 text-center gap-5 mt-10'>
            <input
               className='w-full p-6 h-50 border-2 rounded-xl focus:outline-none focus:border-pink-600 transition-all'
               value={reviewCurrent}
               placeholder="Enter your review here..."
               onChange={(e) => setReviewCurrent(e.target.value)}
            />
            <div className="text-center">
               <StarRatingButtons rating={rating} setRating={setRatingStars} size={12}/>
            </div>
            <button className='p-4 w-1/2 text-center bg-pink-600 text-white rounded-full hover:bg-pink-800 transition-all' onClick={handleAddReview}>Add review</button>
         </div>
         <LineWithText content={"Reviews"} />
         {isLoading ? (
            <div className="flex flex-row items-center justify-center my-4">
               <RotatingLines
                  strokeColor="pink"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="42"
                  visible={true}
               />
            </div>
         ) : (
            reviews.length>0?
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               {reviews?.map((review, index) => (
                  <SingleReview key={index} review={review} fetchReviews={fetchReviews} />
               ))}
            </div>:
            <p className="text-2xl text-primary">There are no reviews yet. Be first to add a review!</p>
         )}
      </>
   );
};

export default ReviewsSection
