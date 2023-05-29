import { useEffect, useState } from "react"
import Toast from "../Utils/Toast"
import axios from "axios"
import SingleUserRow from "./SingleUserRow"
import Modal from "../Utils/Modal"


const UsersTable = () => {
   const [users, setUsers] = useState([])
   const [showModal, setShowModal] = useState(false)
   const [deletingUser, setDeletingUser] = useState("")

   const changeModal = () => {
      setShowModal(prevState => !prevState)
   }

   const handleSetDeleteUser = async (user) => {
      setDeletingUser(user)
   }

   const handleDeleteUser = async () => {
      try {
         await axios.delete(`/api/users/${deletingUser._id}`)
         changeModal()
         Toast({ type: "success", message: `User deleted.`, duration: 1000 });
         fetchUsers();
      } catch (err) {
         Toast({ type: "error", message: `${err.response.data.message}`, duration: 1000 });
      }
   }


   const fetchUsers = async () => {
      try {
         const { data } = await axios.get('/api/users?sort=role')
         console.log(data.data.data)
         setUsers(data.data.data)
      } catch (err) {
         Toast({ type: "error", message: `${err.response.data.message}`, duration: 1000 });
      }
   }

   useEffect(() => {
      fetchUsers();
   }, [])

   return (
      <>
         <table className="w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
            <thead className="bg-neutral-800">
               <tr className="text-white text-center">
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-left"> Name </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4"> Role </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4"> Created at </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4"> Updated at </th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
               {users.map((user, index) => (
                  <SingleUserRow key={index} user={user} fetchUsers={fetchUsers} changeModal={changeModal} handleDeleteUser={handleSetDeleteUser} />
               ))}
            </tbody>
         </table>
         <Modal onClose={changeModal} visible={showModal}>
            <div className="bg-white text-black p-8 rounded">
               Do you really want to delete user <span className="font-bold">{deletingUser.name}</span> ?
               <div className="flex flex-row gap-2 items-center justify-center mt-4">
                  <button className="p-4 rounded-xl w-full border-2 hover:bg-red-600 hover:text-white" onClick={handleDeleteUser}>Delete</button>
                  <button className="p-4 rounded-xl w-full border-2 hover:bg-yellow-300" onClick={changeModal}>Cancel</button>
               </div>
            </div>
         </Modal>
      </>
   )
}

export default UsersTable