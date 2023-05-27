import { useState } from "react"
import { TourState } from "../../context/TourProvider"
import GrayLine from '../Utils/GrayLine'
import { FiEdit2 } from "react-icons/fi"
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai"
import axios from "axios"
import { ToastContainer } from 'react-toastify';
import Toast from "../Utils/Toast"
import { useNavigate } from "react-router-dom"
import { useSignOut } from "react-auth-kit"
import Cookies from "js-cookie"
import MyBookingsSection from "./MyBookingsSection"


const MyCabinet = () => {
   const authToken = Cookies.get('_auth');
   const { user, setLoadUser } = TourState()
   const [isEditing, setIsEditing] = useState(false)
   const [newName, setNewName] = useState(user?.name)
   const [newEmail, setNewEmail] = useState(user?.email)
   const [isDeleteOpen, setIsDeleteOpen] = useState(false)
   const signOut = useSignOut();
   const navigate = useNavigate();

   const handleSubmitEdit = async () => {
      try {
         setIsEditing(prevState => !prevState)
         console.log(user)

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${authToken}`
            },
         };
         await axios.patch(
            `/api/users/updateme`,
            { name: newName, email: newEmail },
            config
         );
         signOut()
         setLoadUser(true)
      } catch (err) {
         Toast({ type: "error", message: `Error occurred`, duration: 2000 });
      }
   }

   const handleDelete = async () => {
      try {
         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${authToken}`
            },
         };
         signOut();
         await axios.delete(
            `/api/users/deleteme`,
            config
         );
         Toast({ type: "success", message: `Profile was deleted.`, duration: 2000 });
         setLoadUser(true)
         navigate('/')

      } catch (err) {
         Toast({ type: "error", message: `Error occurred.`, duration: 2000 });
      }
   }

   if (!user) return <></>
   else {
      user.createdAt = (new Date(user?.createdAt)).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      user.updatedAt = (new Date(user?.updatedAt)).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
   }



   return (
      <div className="container mx-auto my-5">
         <ToastContainer />
         <div className="h-1/2 w-full flex flex-row gap-5">
            <img src={`${user.photo}`} alt="" className="w-1/4 h-full rounded-lg" />
            <div className="w-1/3 flex flex-col">
               <div className="flex flex-row items-center">
                  {isEditing ? (
                     <div className="flex flex-row gap-1">
                        <input type="text" defaultValue={user.name} className="w-full p-4 text-3xl rounded-xl" onChange={(e) => setNewName(e.target.value)} />
                        <button className="p-4 rounded-xl mt-2 hover:bg-green-500 text-black transition-all border-2 border-gray-300" onClick={handleSubmitEdit}>
                           <AiOutlineCheck />
                        </button>
                     </div>
                  ) : (
                     <h2 className="text-primary text-4xl mt-5">{user.name}</h2>
                  )}
                  {user.role != 'admin' && (
                     <div className="flex flex-row ml-auto gap-1">
                        <button className={`p-4 rounded-xl hover:bg-pink-600 hover:text-white transition-all border-2 border-gray-300 ${isEditing && 'bg-pink-600 animate-pulse'}`} onClick={() => setIsEditing(prevState => !prevState)}>
                           <FiEdit2 />
                        </button>
                        <button className={`p-4 rounded-xl hover:bg-red-600 text-black transition-all border-2 border-gray-300 ${isDeleteOpen && 'bg-red-600 text-white animate-pulse'}`} onClick={() => setIsDeleteOpen(prevState => !prevState)}>
                           <AiFillDelete />
                        </button>
                     </div>
                  )}
               </div>
               {isDeleteOpen && user.role != "admin" && (
                  <div className="text-2xl font-bold p-2 border-2 rounded-xl border-red-600 my-2">
                     Are you sure to delete your account?
                     <div className="flex flex-row gap-2 p-2">
                        <button className="p-4 rounded-xl w-full hover:bg-red-600 hover:text-white text-black transition-all border-2 border-gray-300" onClick={handleDelete}>Delete</button>
                        <button className="p-4 rounded-xl w-full hover:bg-yellow-300 text-black transition-all border-2 border-gray-300" onClick={() => setIsDeleteOpen(prevState => !prevState)}>Cancel</button>
                     </div>
                  </div>
               )}

               <GrayLine />
               <h4 className="text-primary text-2xl">
                  Email:
                  {isEditing ? (
                     <input type="text" defaultValue={user.email} className="w-full p-4 text-3xl rounded-xl" onChange={(e) => setNewEmail(e.target.value)} />
                  ) : (
                     <span className="ml-2">
                        {user.email}
                     </span>
                  )}

               </h4>
               <div className="mt-auto mb-4">
                  <GrayLine />
                  <h4 className="text-gray-600 text-lg">Profile created at {user.createdAt} <span className="font-bold">|</span> Last update at {user.updatedAt}</h4>
               </div>
            </div>
         </div>

         <MyBookingsSection />
      </div >
   )
}

export default MyCabinet