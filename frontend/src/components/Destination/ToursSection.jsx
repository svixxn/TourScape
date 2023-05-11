/* eslint-disable react/prop-types */
import SingleTourCard from "./SingleTourCard"

// TODO: single tour card
const ToursSection = (props) => {
  return (
   <div>
      <h1 className='text-5xl text-primary font-bold'>Tours</h1>
      {props.tours.map((tour,index) => (
         <SingleTourCard key={index} tour={tour}/>
      ))}
   </div>
  )
}

export default ToursSection