import LineWithText from '../Utils/LineWithText'
import UsersTable from './UsersTable'

const AdminPanel = () => {
  return (
    <div className="container mx-auto my-5">
      <div className="w-full flex flex-col text-center">
        <h1 className="text-primary text-4xl bold">Admin Panel</h1>
        <LineWithText content={"Users"} />
        <UsersTable />
      </div>
    </div>
  )
}

export default AdminPanel