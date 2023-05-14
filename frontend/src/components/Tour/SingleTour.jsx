import axios from 'axios'
import { useEffect, useState } from 'react'
import { MdGroups, MdAccessTimeFilled, MdTimer, MdOutlineLanguage } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import StarRating from '../Utils/StarRating'
import { FaWallet } from 'react-icons/fa'
import {GiMountainRoad} from 'react-icons/gi'
import GrayLine from '../Utils/GrayLine'
import LineWithText from '../Utils/LineWithText'
import TourGuideCard from './TourGuideCard'

const SingleTour = () => {
  const [tour, setTour] = useState(null)
  const { slug } = useParams()
  const filledStars = Math.floor(tour?.ratingsAverage);
  const hasHalfStar = tour?.ratingAverage - filledStars >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/tours/${slug}`)
        setTour(data.data.data)
      } catch (err) {
        toast.error('An error occured!', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    )();
  }, [slug])

  if (!tour) return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  )

  return (
    <div>
      <ToastContainer />
      <div className='container mx-auto grid grid-cols-12 justify-items-stretch gap-4 pt-6'>
        <img src={`${tour.photo[1]}`} alt="photo" className='rounded col-span-8' />
        <div className='col-span-4 flex flex-col gap-2'>
          <img src={`${tour.photo[2]}`} alt="photo" className='h-full rounded' />
          <img src={`${tour.photo[0]}`} alt="photo" className='h-full rounded' />
        </div>
      </div>

      <div className='container mx-auto mt-10'>
        <div className='grid grid-cols-1 p-5 lg:p-0 lg:grid-cols-12'>
          <div className="col-span-8">
            <h1 className='text-4xl text-primary font-bold'>{tour.name}</h1>

            <h3 className='text-gray-500 py-3'>By Tours in
              <Link to={`/destinations/${tour.destination.toLowerCase()}`}><span className='underline'> {tour.destination}</span></Link>
            </h3>
            <div className='flex flex-row gap-x-2 my-4 items-center'>
              <StarRating filledStars={filledStars} hasHalfStar={hasHalfStar} emptyStars={emptyStars} />
              <span className="pb-1">{tour.ratingsAverage}</span>
              <span className="pb-[0.125rem] text-gray-500 text-base">({tour.ratingQuantity} reviews)</span>
            </div>

            <p className='font-normal'>{tour.description}</p>

            <div className="flex flex-row mt-5 gap-2 text-lg underline items-center">
              <FaWallet className='text-pink-600' />
              <span>Lowest price guarantee &#8226;</span>
              <span>Reserve now & pay later &#8226;</span>
              <span>Free cancellation</span>
            </div>
            <LineWithText content={"Info"}/>
            <div className='flex flex-col gap-4 font-normal justify-center'>
              <div className='flex flex-row items-center gap-2'><MdGroups /> Max of {tour.maxGroupSize} per group </div>
              <div className='flex flex-row items-center gap-2'><MdAccessTimeFilled /> Duration: {tour.duration}</div>
              <div className='flex flex-row items-center gap-2'><GiMountainRoad /> Difficulty: {tour.difficulty}</div>
              <div className='flex flex-row items-center gap-2'><MdTimer /> Start time: Check availability</div>
              <div className='flex flex-row items-center gap-2'><MdOutlineLanguage />English</div>
            </div>
            <LineWithText content={"Guides"}/>
            <div className='flex flex-row gap-4'>
              {tour.guides?.map((guide,index)=>(
                <TourGuideCard key={index} guide={guide}/>
              ))}
            </div>
            <LineWithText content={"Locations"}/>
          </div>
{/* TODO: finish page */}
          <div className="col-span-4"></div>

        </div>
      </div>
    </div>
  )
}

export default SingleTour