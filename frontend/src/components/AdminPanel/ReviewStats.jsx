import { useEffect, useState } from "react"
import Toast from "../Utils/Toast"
import axios from "axios"
import SingleReviewRow from "./SingleReviewRow"

const BookingStats = () => {
   const [group, setGroup] = useState([])

   useEffect(() => {
      (async () => {
         try{
            const {data} = await axios.get('/api/reviews/review-stats')
            setGroup(data.data.stats)
         }catch(err){
            Toast({ type: "error", message: `${err.response.data.message}`, duration: 1000 });
      }
      })()
   }, [])
   return (
      <table className="w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
         <thead className="bg-neutral-800">
            <tr className="text-white text-center">
               <th className="font-semibold text-sm uppercase px-6 py-4"> Number of Reviews </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Average Rating </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Minimum Rating </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Maximum Rating </th>
            </tr>
         </thead>
         <tbody className="divide-y divide-gray-200">
            {group.map((element, index) => (
               <SingleReviewRow key={index} element={element}/>
            ))}
         </tbody>
      </table>
   )
}

export default BookingStats