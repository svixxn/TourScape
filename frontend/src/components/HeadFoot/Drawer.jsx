/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import SingleDestinationLink from "../Home/SingleDestinationLink";
import { TourState } from "../../context/TourProvider";
import { RotatingLines } from 'react-loader-spinner'
import Toast from "../Utils/Toast";



const Drawer = () => {
   const [isLoading, setIsLoading] = useState(false)
   const [result, setResult] = useState([])
   const { isDrawerOpen, setIsDrawerOpen } = TourState();
   const [search, setSearch] = useState("")

   useEffect(() => {
      if (isDrawerOpen)
         (async () => {
            try {
               setIsLoading(true)
               const { data } = await axios.get(`/api/destinations?search=${search}`)
               setIsLoading(false)
               setResult(data.data.data)
            } catch (err) {
               Toast({ type: "error", message: `${err.response.data.message}`, duration: 1000 });
            }
         }
         )();
   }, [search, isDrawerOpen])



   return (
      <div
         className={
            "fixed z-30 bg-slate-950 bg-opacity-40 inset-0 transform ease-in-out flex flex-row" +
            (isDrawerOpen
               ? "transition-opacity opacity-100 duration-500 translate-x-0"
               : "transition-all duration-200 opacity-0 translate-x-full")
         }
      >
         <div className="flex flex-col w-96 h-full bg-gradient-to-tr from-pink-900 to-pink-600 m-0">
            <div className="px-4 py-3 border-b">
               <h2 className="text-lg font-medium">Search destinations</h2>
               <input type="text" className='rounded-md px-4 py-2 border-none w-72 text-black' placeholder='Poltava' onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="px-4 flex flex-col">
               {isLoading ? (
                  <div className="flex flex-row justify-center mt-2">
                     <RotatingLines
                        strokeColor="pink"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="32"
                        visible={true}
                     />
                  </div>
               ) : (
                  result?.map((destination, index) => (
                     <SingleDestinationLink key={index} destination={destination} />
                  ))
               )}


            </div>
         </div>
         <section
            className='w-full h-full cursor-pointer'
            onClick={() => {
               setIsDrawerOpen(false);

            }}
         ></section>
      </div>
   )
}

export default Drawer