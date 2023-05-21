/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Cookies from "js-cookie";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner"
import SingleReview from "./SingleReview";
import { ToastContainer } from 'react-toastify';
import Toast from "../Utils/Toast";

const ReviewsSection = ({ tour }) => {
   const authToken = Cookies.get('_auth');
   const [reviews, setReviews] = useState([]);
   const [reviewCurrent, setReviewCurrent] = useState("");
   const [isLoading, setIsLoading] = useState(false);

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
      try {
         if(!reviewCurrent){
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
            rating: 3.5
         }, config);
         await fetchReviews();
         Toast({ type: "success", message: "Review Added Successfully", duration: 1000 });

      } catch (error) {
         Toast({ type: "error", message: `${error.response.data.message}`, duration: 2000 });
      }
      setReviewCurrent("");
      setIsLoading(false);
   }
   return (
      <>
         <ToastContainer />
         <div className='mb-6 text-center'>
            <input
               className='w-full p-6 h-50 border-2 rounded-xl focus:outline-none focus:border-pink-600 transition-all'
               value={reviewCurrent}
               placeholder="Enter your review here..."
               onChange={(e) => setReviewCurrent(e.target.value)}
            />
            <button className='p-4 my-5 w-1/2 text-center bg-pink-600 text-white rounded-full hover:bg-pink-800 transition-all' onClick={handleAddReview}>Add review</button>
         </div>

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               {reviews?.map((review, index) => (
                  <SingleReview key={index} review={review} />
               ))}
            </div>
         )}
      </>
   );
};

export default ReviewsSection
