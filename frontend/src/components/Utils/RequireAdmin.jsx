import { Navigate } from "react-router-dom";
import { TourState } from "../../context/TourProvider";

/* eslint-disable react/prop-types */
const RequireAdmin = ({ children }) => {
   const { user } = TourState()
   const isAdmin = user?.role === 'admin' || user?.role ==='lead-guide'

   if (isAdmin) {
      return children;
   } else {
      return <Navigate to="/" />;
   }
}

export default RequireAdmin