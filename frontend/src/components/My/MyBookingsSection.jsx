/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import SingleBookingCard from "./SingleBookingCard"
import Toast from "../Utils/Toast"
import axios from "axios"
import { RotatingLines } from "react-loader-spinner"
import GrayLine from "../Utils/GrayLine"

const MyBookingsSection = () => {
   const [bookings, setBookings] = useState([])
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      fetchBookings();
   }, [])

   const fetchBookings = async () => {
      setIsLoading(true)
      try {
         const { data } = await axios.get('/api/bookings/my')
         setBookings(data.data.data)
         setIsLoading(false)
      } catch (err) {
         Toast({ type: "error", message: `${err.response.data.message}`, duration: 1000 });
      }
   }

   if (isLoading) return <div className="flex flex-row justify-center mt-2">
      <RotatingLines
         strokeColor="pink"
         strokeWidth="5"
         animationDuration="0.75"
         width="42"
         visible={true}
      />
   </div>


   return (
      <div className="my-5">
         <h1 className='text-5xl text-primary font-bold'>My bookings</h1>
         {bookings.length === 0 ? (<h1 className='text-3xl font-semibold mt-4'>You do not have any bookings.</h1>) : (
            <div className="flex flex-col gap-2 mt-4">
               {bookings.map((booking, index) => (
                  <div key={index}>
                     <GrayLine/>
                     <SingleBookingCard booking={booking} fetchBookings={fetchBookings}/>
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default MyBookingsSection