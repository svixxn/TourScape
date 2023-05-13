/* eslint-disable react/prop-types */
import SingleTourCard from "./SingleTourCard"

// TODO: single tour card
const ToursSection = (props) => {
   return (
      <div className="mb-5">
         <h1 className='text-5xl text-primary font-bold'>Tours</h1>
         {props.tours.length === 0 ? (<h1 className='text-3xl font-semibold'>There are no available tours.</h1>) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-4">
               {props.tours.map((tour, index) => (
                  <SingleTourCard key={index} tour={tour} />
               ))}
            </div>
         )}
      </div>
   )
}

export default ToursSection