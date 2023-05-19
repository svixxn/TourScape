import axios from "axios";
import Cookies from 'js-cookie';


/* eslint-disable react/prop-types */
const PayButton = ({ item, date, numberOfPeople }) => {
   const authToken = Cookies.get('_auth');


   const handleCheckout = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        };
    
        const body = {
          item: item,
          startDate: date,
          numberOfPeople: numberOfPeople,
        };
    
        const response = await axios.post(
          '/api/bookings/checkout-session',
          body,
          config
        );
        if (response.data) window.location.href = response.data.session.url;
      } catch (err) {
        console.log(err);
      }
    };
    

   return (
      <button className='p-4 my-5 text-center bg-pink-600 text-white rounded-full hover:bg-pink-800 transition-all' onClick={handleCheckout}>Reserve Now</button>
   )
}

export default PayButton