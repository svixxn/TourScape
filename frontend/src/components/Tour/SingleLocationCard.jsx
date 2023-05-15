/* eslint-disable react/prop-types */
const SingleLocationCard = ({ location, index }) => {
   return (
      <div className='flex flex-row gap-3'>
         <div className='px-6 py-3 border-2 flex justify-center items-center bg-black text-white rounded-full'>{index+1}</div>
         <div className='flex flex-col'>
            <h1 className="font-semibold">{location.description}</h1>
            <h2 className='text-gray-500 text-lg'>
               Stop: {location.hours < 1 ? location.hours * 100 + " minutes": location.hours + " hours"}
            </h2>
         </div>
      </div>
   )
}

export default SingleLocationCard