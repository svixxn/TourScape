import axios from "axios"
import { useEffect, useState } from "react"
import Toast from "../Utils/Toast"
import { RotatingLines } from "react-loader-spinner"
import SingleTourCard from "../Destination/SingleTourCard"
import LineWithText from "../Utils/LineWithText"

const Top5Tours = () => {
   const [tours, setTours] = useState([])
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      (async () => {
         try {
            setIsLoading(true)
            const { data } = await axios.get('/api/tours/top-5-cheap');
            setTours(data.data.data);
            setIsLoading(false)
         } catch (err) {
            Toast({ type: "error", message: `Error occurred`, duration: 2000 });
         }
      })()
   },[])
   return (
      <div className="container mx-auto">
      <LineWithText content={`Top 4 best tours`} />
         {isLoading ? (
            <div className="flex flex-row justify-center mt-2">
               <RotatingLines
                  strokeColor="pink"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="42"
                  visible={true}
               />
            </div>
         ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
               {tours.length > 0 ? tours.map((tour, index) => (
                  <SingleTourCard key={index} tour={tour} />
               )) : (<div>Tours not found.</div>)}
            </div>
         )}
      </div>
   )
}

export default Top5Tours