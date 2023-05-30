import { useEffect, useState } from "react"
import Toast from "../Utils/Toast"
import axios from "axios"
import SingleBookingRow from "./SingleBookingRow"

const BookingStats = () => {
   const [group, setGroup] = useState([])

   useEffect(() => {
      (async () => {
         try{
            const {data} = await axios.get('/api/bookings/booking-stats')
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
               <th className="font-semibold text-sm uppercase px-6 py-4"> Number of Bookings </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Average Price </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Minimum Price </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Maximum Price </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> People in average </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Minimum People </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Maximum People </th>
            </tr>
         </thead>
         <tbody className="divide-y divide-gray-200">
            {group.map((element, index) => (
               <SingleBookingRow key={index} element={element}/>
            ))}
         </tbody>
      </table>
   )
}

export default BookingStats