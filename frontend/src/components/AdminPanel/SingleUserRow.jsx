import axios from "axios";
import Toast from "../Utils/Toast";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";

/* eslint-disable react/prop-types */
const SingleUserRow = ({ user, fetchUsers, changeModal, handleDeleteUser }) => {
   const [newRole, setNewRole] = useState(user.role)
   const [isEditing, setIsEditing] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const handleChangeRole = async () => {
      if (newRole === user.role || user.role === 'admin') {
         setIsEditing(false)
         return;
      }
      setIsLoading(true)
      try {
         await axios.patch(`/api/users/${user._id}`, { role: newRole })
         Toast({ type: "success", message: `Role changed.`, duration: 1000 });
         fetchUsers();
         setIsEditing(false)
         setNewRole(user.role)
         setIsLoading(false)
      } catch (err) {
         Toast({ type: "error", message: `${err.response.data.message}`, duration: 1000 });
      }
   }

   const handleDelete = async () => {
      handleDeleteUser(user)
      changeModal()
   }

   if (isLoading) return <div className="flex flex-row justify-center mt-2">
      <RotatingLines
         strokeColor="pink"
         strokeWidth="5"
         animationDuration="0.75"
         width="48"
         visible={true}
      />
   </div>

   return (
      <tr>
         <td className="px-6 py-4">
            <div className="flex items-center space-x-3">
               <div className="inline-flex w-10 h-10"> <img className='w-10 h-10 object-cover rounded-full' alt='User avatar' src={`${user.photo}`} /> </div>
               <div className="flex flex-col items-start">
                  <p> {user.name} </p>
                  <p className="text-gray-500 text-sm font-semibold tracking-wide"> {user.email} </p>
               </div>
            </div>
         </td>
         <td className="px-6 py-4 text-center">
            <div className={`flex ${isEditing ? 'flex-col items-center' : 'flex-row items-center justify-center'} gap-1`}>
               {isEditing ? (
                  <div className='w-72 font-medium'>
                     <ul className={`bg-white mt-2 overflow-y-auto transition-all max-h-40 }`}>
                        <li className={`p-2 text-sm cursor-pointer ${newRole === 'user' && 'bg-pink-600 text-white'}`} onClick={() => { setNewRole("user") }}>user</li>
                        <li className={`p-2 text-sm cursor-pointer ${newRole === 'guide' && 'bg-pink-600 text-white'}`} onClick={() => { setNewRole("guide") }}>guide</li>
                        <li className={`p-2 text-sm cursor-pointer ${newRole === 'lead-guide' && 'bg-pink-600 text-white'}`} onClick={() => { setNewRole("lead-guide") }}>lead-guide</li>
                        <li className={`p-2 text-sm cursor-pointer ${newRole === 'admin' && 'bg-pink-600 text-white'}`} onClick={() => { setNewRole("admin") }}>admin</li>
                     </ul>
                  </div>
               ) : (<span className={`text-white text-sm w-1/3 font-semibold p-4 rounded-full
            ${user.role === 'admin' && 'bg-pink-600 text-white'}
            ${user.role === 'lead-guide' && 'bg-green-600 text-white'}
            ${user.role === 'guide' && 'bg-green-800'}
            ${user.role === 'user' && 'bg-gray-500 text-white'}
           `}>
                  {user.role}
               </span>)}
               {user.role != 'admin' && (
                  <div className="flex flex-row gap-1">
                     <button className={`p-4 rounded-xl hover:bg-pink-600 hover:text-white transition-all border-2 border-gray-300 ${isEditing && 'bg-pink-600 animate-pulse text-white'}`} onClick={() => setIsEditing(prevState => !prevState)}>
                        <FiEdit2 />
                     </button>
                     {!isEditing && (
                        <>
                           <button className={`p-4 rounded-xl hover:bg-red-600 text-black transition-all border-2 border-gray-300`} onClick={handleDelete}>
                              <AiFillDelete />
                           </button>

                        </>
                     )}
                     {isEditing && (
                        <button className="p-4 rounded-xl hover:bg-green-500 text-black transition-all border-2 border-gray-300" onClick={handleChangeRole}>
                           <AiOutlineCheck />
                        </button>
                     )}
                  </div>
               )}
            </div>
         </td>
         <td className="px-6 py-4 text-center"> {(new Date(user.createdAt)).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} </td>
         <td className="px-6 py-4 text-center"> {(new Date(user.updatedAt)).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} </td>
      </tr >
   )
}

export default SingleUserRow