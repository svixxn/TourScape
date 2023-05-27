import { MdAccessTimeFilled } from "react-icons/md"
import { BsCheck2All } from 'react-icons/bs'
import Toast from "../Utils/Toast"
import axios from "axios"
import Cookies from "js-cookie"
import { AiFillDelete } from "react-icons/ai"




/* eslint-disable react/prop-types */
const SingleBookingCard = ({ booking, fetchBookings }) => {
   const authToken = Cookies.get('_auth');
   booking.onDate = (new Date(booking.onDate)).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
   booking.createdAt = (new Date(booking.createdAt)).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
   const handleDelete = async () => {
      try {
         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${authToken}`
            },
         };
         await axios.delete(
            `/api/bookings/${booking._id}`,
            config
         );
         fetchBookings();
         Toast({ type: "success", message: `Booking was deleted.`, duration: 2000 });
      } catch (err) {
         Toast({ type: "error", message: `Error occurred.`, duration: 2000 });
      }
   }

   return (
      <div className="w-full p-4 border-2 shadow-lg rounded-xl transition-all">
         <div className="flex flex-row w-full gap-10">
            <img src={`${booking.tour.photo[0]}`} alt="" className="w-1/4 h-1/4" />
            <img src={`${booking.tour.photo[1]}`} alt="" className="w-1/4 h-1/4" />
            <div className="flex flex-col gap-3">
               <div className="flex flex-row justify-between w-full">
                  <h1 className="text-primary text-3xl font-bold">{booking.tour.name}</h1>
                  <button className={`p-4 rounded-xl hover:bg-red-600 hover:text-white text-black transition-all border-2 border-gray-300 `} onClick={handleDelete}>
                     <AiFillDelete />
                  </button>
               </div>
               <div className="text-primary text-2xl flex flex-row gap-1 items-center">
                  <MdAccessTimeFilled />
                  {booking.tour.duration} hours
               </div>
               <h2 className="text-xl text-gray-500">Start Date: {booking.onDate}, {booking.numberOfPeople} Adults </h2>
               <div className="mt-auto flex flex-row items-center gap-32">
                  <h2 className="mt-auto text-4xl bold">Total price: ${booking.price} </h2>
                  <div className="text-green-700 flex flex-row gap-2 items-center text-2xl">
                     <BsCheck2All /> Payed on {booking.createdAt}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SingleBookingCard