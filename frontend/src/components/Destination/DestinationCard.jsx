/* eslint-disable react/prop-types */
const DestinationCard = ({destination}) => {
   destination.createdAt = (new Date(destination.createdAt)).toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'})

   return (
      <div className="rounded overflow-hidden shadow-lg">
         <img className="w-full" src={destination.photo} alt="Sunset in the mountains"></img>
         <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{destination.name}</div>
            <p className="text-gray-700 text-base">
               {destination.short_desc}
            </p>
         </div>
         <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Added at: {destination.createdAt}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#destinations</span>
         </div>
      </div>
   )
}

export default DestinationCard