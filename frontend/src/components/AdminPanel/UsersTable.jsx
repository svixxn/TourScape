import { useEffect, useState } from "react"
import Toast from "../Utils/Toast"
import axios from "axios"
import SingleUserRow from "./SingleUserRow"


const UsersTable = () => {
   const [users, setUsers] = useState([])

   useEffect(() => {
      fetchUsers();
   }, [])

   const fetchUsers = async () => {
      try {
         const { data } = await axios.get('/api/users?sort=role')
         console.log(data.data.data)
         setUsers(data.data.data)
      } catch (err) {
         Toast({ type: "error", message: `${err.response.data.message}`, duration: 1000 });
      }
   }

   return (
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
               <SingleUserRow key={index} user={user} fetchUsers={fetchUsers}/>
            ))}
         </tbody>
      </table>
   )
}

export default UsersTable