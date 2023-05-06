import LineWithText from '../Utils/LineWithText'
import SingleReview from './SingleReview'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LatestReviews = () => {
   const [lastReviews, setLastReviews] = useState([])

   useEffect(() => {
      (async () => {
         try {
            const config = {
               headers: {
                  "Content-type": "application/json",
               },
            };
            const { data } = await axios.get(
               "/api/reviews?limit=3",
               config
            );
            setLastReviews(data.data.data)
         } catch (error) {
            console.log(error)
         }
      })();
   }, [])

   if (!lastReviews) return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    )

   return (
      <div className='container mx-auto text-center'>
         <LineWithText content={"Latest Reviews"} />
         <div className='h-[20rem] items-center justify-between flex flex-col md:flex-row'>
         {lastReviews.map((review, index) => (
            <SingleReview key={index} review={review} />
          ))}
         </div>
      </div>
   )
}

export default LatestReviews