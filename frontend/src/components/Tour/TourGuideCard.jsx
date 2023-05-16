/* eslint-disable react/prop-types */
const TourGuideCard = ({guide}) => {
  return (
    <div className="flex flex-row gap-3 items-center p-2 bg-gray-200 border-pink-400 w-1/2 rounded-2xl hover:bg-gray-300 transition-all cursor-pointer">
      <img src={`${guide.photo}`} alt="" className="rounded-full w-12 h-12"/>
      <div className="flex flex-col">
         <span className="text-2xl font-semibold">{guide.name}</span>
         <span className="text-gray-400 underline">{guide.role}</span>
      </div>
    </div>
  )
}

export default TourGuideCard