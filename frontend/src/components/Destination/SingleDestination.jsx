import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { AiOutlineCloud } from 'react-icons/ai'
import LineWithText from '../Utils/LineWithText';


const SingleDestination = () => {
  const [destination, setDestination] = useState()
  const { slug } = useParams()
  const [isAccOpen, setIsAccOpen] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/destinations/${slug}`)
        setDestination(data.data.data)
      } catch (err) {
        toast.error('An error occured!', {
          position: "bottom-left",
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

  if (!destination || !destination.photo) return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  )

  return (
    <div>
      <div className='w-full h-50 p-0 md:p-4 lg:p-8 flex flex-col md:flex-row gap-4 items-center'>
        <img src={`${destination.photo[0]}`} className='w-[100%] md:w-[50%] rounded-0 md:rounded-xl' alt="" />
        <img src={`${destination.photo[1]}`} className='w-[100%] md:w-[50%] rounded-0 md:rounded-xl' alt="" />
      </div>

      <LineWithText content={"Description"} />

      <div className='flex flex-'></div>

      <div className='flex flex-col md:flex-row items-center justify-between px-14 text-4xl'>
        <div className='flex flex-col text-center'>
          <div className='underline'>Tours Available</div>
          <div className='text-center text-2xl font-bold'>{destination.tours.length}</div>
        </div>
        <div className='flex flex-col ml-0 mt-5 md:mt-0 md:ml-24 text-center'>
          <div className='underline'>Hotels Available</div>
          <div className='text-center text-2xl font-bold'>{destination.hotels.length}</div>
        </div>
        <div className='flex flex-col text-center'>
          <div className='underline'>Restaurants Available</div>
          <div className='text-center text-2xl font-bold'>{destination.restaurants.length}</div>
        </div>
      </div>

      <div className='flex flex-row items-center justify-center'>
        <button className='w-[75%] p-8 mt-8 bg-gradient-to-r from-pink-800 to-pink-400 text-white font-semibold rounded-xl' onClick={()=>setIsAccOpen(prevState => !prevState)}>Show Description</button>
      </div>
      {isAccOpen? (<div className='m-10 border-4 p-8'>
        <p>{destination.description}</p>
      </div>) : (<div></div>)}
      

    </div >
  )
}

export default SingleDestination