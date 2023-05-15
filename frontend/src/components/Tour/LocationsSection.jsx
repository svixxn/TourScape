/* eslint-disable react/prop-types */
import SingleLocationCard from './SingleLocationCard'
import { MdArrowDownward, MdLocationPin } from 'react-icons/md'

const LocationsSection = ({tour}) => {
   return (
      <div className='flex flex-col items-start'>
         <div className='flex flex-row gap-3'>
            <div className='p-5 border-2 flex justify-center items-center border-black rounded-full bg-none'><MdLocationPin /></div>
            <div className='flex flex-col'>
               <h1>You will start at</h1>
               <h2 className='text-gray-400 text-lg'>{tour.startLocation.address}</h2>
            </div>
         </div>

         {tour.locations?.map((location, index) => (
            <div key={index}>
               <MdArrowDownward className='ml-5' />
               <SingleLocationCard location={location} index={index} />
            </div>
         ))}
         <MdArrowDownward className='ml-5' />
         <div className='flex flex-row gap-3 items-center'>
            <div className='p-5 border-2 flex justify-center items-center border-black rounded-full bg-none'><MdLocationPin /></div>
            <h1>You will return to the start point</h1>
         </div>
      </div>
   )
}

export default LocationsSection