import { useState } from "react"
import { TourState } from "../../context/TourProvider"
import GrayLine from '../Utils/GrayLine'
import { FiEdit2 } from "react-icons/fi"

const MyCabinet = () => {
   const { user, setLoadUser } = TourState()
   const [isEditing, setIsEditing] = useState(false)

   if (!user) return <></>
   else {
      user.createdAt = (new Date(user?.createdAt)).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      user.updatedAt = (new Date(user?.updatedAt)).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
   }



   return (

      <div className="container mx-auto my-5">
         <div className="h-[25rem] w-full flex flex-row gap-5">
            <img src={`${user.photo}`} alt="" className="w-1/4 h-full rounded-lg" />
            <div className="w-1/3 flex flex-col">
               <div className="flex flex-row items-center">
                  {isEditing ? (
                     <input type="text" defaultValue={user.name} className="w-full p-4 text-3xl rounded-xl"/>
                  ): (
                        <h2 className = "text-primary text-4xl mt-5">{user.name}</h2>
                  )}
               <div className="flex flex-row ml-auto">
                  <button className={`p-4 rounded-xl hover:bg-pink-600 hover:text-white transition-all border-2 border-gray-300 ${isEditing && 'bg-pink-600 animate-pulse'}`} onClick={() => setIsEditing(prevState => !prevState)}>
                     <FiEdit2 />
                  </button>
               </div>
            </div>
            <GrayLine />
            <h4 className="text-primary text-2xl">
               Email:
               <span className="ml-2">
                  {user.email}
               </span>
            </h4>
            <div className="mt-auto mb-4">
               <GrayLine />
               <h4 className="text-gray-600 text-lg">Profile created at {user.createdAt} <span className="font-bold">|</span> Last update at {user.updatedAt}</h4>
            </div>
         </div>
      </div>
      </div >
   )
}

export default MyCabinet