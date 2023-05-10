import { Link } from "react-router-dom"
/* eslint-disable react/prop-types */
const SingleDestinationLink = ({ destination }) => {

  return (
    <Link to={`/destinations/${destination.slug}`}>
      <div className="flex flex-row items-center gap-1 rounded-full bg-white my-3 hover:bg-blue-200 transition duration-200">
        <img src={`${destination.photo}`} alt="" className="w-20 rounded-full"/>
        <div className="text-2xl text-black font-normal">{destination.name}</div>
      </div>
    </Link>
  )
}

export default SingleDestinationLink