import { useEffect, useState } from "react"
import SingleTourRow from "./SingleTourRow"
import Toast from "../Utils/Toast"
import axios from "axios"

const TourStats = () => {
   const [group, setGroup] = useState([])

   useEffect(() => {
      (async () => {
         try{
            const {data} = await axios.get('/api/tours/tour-stats')
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
               <th className="font-semibold text-sm uppercase px-6 py-4 text-left"> Difficulty </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Number of Tours </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Number of reviews </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Average Rating </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Average Price </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Minimal Price </th>
               <th className="font-semibold text-sm uppercase px-6 py-4"> Maximum Price </th>
            </tr>
         </thead>
         <tbody className="divide-y divide-gray-200">
            {group.map((element, index) => (
               <SingleTourRow key={index} element={element}/>
            ))}
         </tbody>
      </table>
   )
}

export default TourStats