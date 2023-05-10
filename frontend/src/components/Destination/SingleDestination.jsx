import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


const SingleDestination = () => {
  const [destination, setDestination] = useState()
  const { slug } = useParams()

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

  if (!destination) return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  )

  return (
    <div>
      <div className='w-full h-50 p-0 md:p-4 lg:p-8'>
        <img src={`${destination.photo}`} className='w-[100%] md:w-[50%] rounded-0 md:rounded-xl' alt="" />

      </div>
    </div>
  )
}

export default SingleDestination