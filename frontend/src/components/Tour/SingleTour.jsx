import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LineWithText from '../Utils/LineWithText'
import LocationsSection from './LocationsSection'
import GuidesSection from './GuidesSection'
import InfoSection from './InfoSection'
import PhotoSection from './PhotoSection'
import DescSection from './DescSection'
import BookingSection from './BookingSection'
import ReviewsSection from './ReviewsSection'
import Toast from '../Utils/Toast'

const SingleTour = () => {


  const [tour, setTour] = useState(null)

  const { slug } = useParams()
  const filledStars = Math.round(tour?.ratingsAverage);
  const emptyStars = 5 - filledStars;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/tours/${slug}`)
        setTour(data.data.data)
      } catch (err) {
        Toast({ type: "error", message: `${err.response.data.message}`, duration: 1000 });
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
      <PhotoSection tour={tour} />
      <div className='container mx-auto mt-10'>
        <div className='grid grid-cols-1 p-4 lg:p-0 lg:grid-cols-12 gap-4'>
          <div className="col-span-8">
            <DescSection tour={tour} filledStars={filledStars} emptyStars={emptyStars} />
            <LineWithText content={"Info"} />
            <InfoSection tour={tour} />
            <LineWithText content={"Guides"} />
            <GuidesSection tour={tour} />
            <LineWithText content={"Locations"} />
            <LocationsSection tour={tour} />
          </div>
          <div className="col-span-4">
            <BookingSection tour={tour} />
          </div>
        </div>

        <ReviewsSection tour={tour} />
      </div>
    </div>
  )
}

export default SingleTour