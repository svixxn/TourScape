import { TourState } from '../../context/TourProvider';

function Main() {
  const {user, setUser} = TourState(); 

  return (
    <div>{JSON.stringify(user)}</div>
  )
}

export default Main