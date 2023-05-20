import SingleReview from "./SingleReview"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner"


/* eslint-disable react/prop-types */
const ReviewsSection = ({ tour }) => {
   const authToken = Cookies.get('_auth');
   const [reviews, setReviews] = useState([])
   const [reviewCurrent, setReviewCurrent] = useState("")
   const [isLoading, setIsLoading] = useState(false)
   const [added, setAdded] = useState(false)


   useEffect(()=> {
      (async () => {
         try{
            const {data} = await axios.get(`/api/tours/${tour._id}/reviews`)
            setReviews(data.data.data)
            setIsLoading(false)
         }catch(err){
            console.log(err)
         }
      })()
   },[tour._id, added])

   const handleAddReview = async () => {
      try {
         setIsLoading(true)
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

         setReviewCurrent("")
         setAdded(!added)
      } catch (error) {
         console.error("Error adding review:", error);
      }
   };

   return (
      <>
         <div className='mb-6 text-center'>
            <CKEditor
               editor={ClassicEditor}
               onChange={(event, editor) => {
                  const data = editor.getData();
                  setReviewCurrent(data);
               }}
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
            <div className="grid grid-cols-2 gap-4">
               {reviews?.map((review, index) => (
                  <SingleReview key={index} review={review}/>
               ))}
            </div>
         )}


      </>
   )
}

export default ReviewsSection