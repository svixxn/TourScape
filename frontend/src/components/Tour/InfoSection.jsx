/* eslint-disable react/prop-types */
import { GiMountainRoad } from "react-icons/gi"
import { MdAccessTimeFilled, MdGroups, MdOutlineLanguage, MdTimer } from "react-icons/md"

const InfoSection = ({tour}) => {
  return (
   <div className='flex flex-col gap-4 font-normal justify-center'>
   <div className='flex flex-row items-center gap-2'><MdGroups /> Max of {tour.maxGroupSize} per group </div>
   <div className='flex flex-row items-center gap-2'><MdAccessTimeFilled /> Duration: {tour.duration} hours</div>
   <div className='flex flex-row items-center gap-2'><GiMountainRoad /> Difficulty: {tour.difficulty}</div>
   <div className='flex flex-row items-center gap-2'><MdTimer /> Start time: Check availability</div>
   <div className='flex flex-row items-center gap-2'><MdOutlineLanguage />English</div>
 </div>
  )
}

export default InfoSection