import TourGuideCard from "./TourGuideCard"

/* eslint-disable react/prop-types */
const GuidesSection = ({tour}) => {
  return (
   <div className='flex flex-row gap-4'>
   {tour.guides?.map((guide, index) => (
     <TourGuideCard key={index} guide={guide} />
   ))}
 </div>
  )
}

export default GuidesSection