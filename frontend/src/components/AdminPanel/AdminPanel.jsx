import LineWithText from '../Utils/LineWithText'
import BookingStats from './BookingStats'
import TourStats from './TourStats'
import ReviewStats from './ReviewStats'
import UsersTable from './UsersTable'
import { TourState } from '../../context/TourProvider'

const AdminPanel = () => {
  const { user } = TourState()
  return (
    <div className="container mx-auto my-5">
      <div className="w-full flex flex-col text-center">
        <h1 className="text-primary text-4xl bold">Admin Panel</h1>
        {user.role === 'admin' && (
          <>
            <LineWithText content={"Users"} />
            <UsersTable /></>
        )}
        <LineWithText content={"Tour Statistics"} />
        <TourStats />
        <LineWithText content={"Booking Statistics"} />
        <BookingStats />
        <LineWithText content={"Review Statistics"} />
        <ReviewStats />
      </div>
    </div>
  )
}

export default AdminPanel