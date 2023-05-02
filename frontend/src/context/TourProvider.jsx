import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const TourContext = createContext({});

const TourProvider = (props) => {
  const [user, setUser] = useState();
  const [destination, setDestination] = useState();
  const navigate = useNavigate();
  //TODO: fix the use effect bug
  useEffect(() => {
    const userInfo = JSON.parse(Cookies.get('_auth_state'))
    if(userInfo) setUser(userInfo)
    else navigate('/')
    console.log(userInfo)
  }, [navigate]);
  return (
    <TourContext.Provider
      value={{
        user, setUser,
        destination, setDestination
      }}
    >
      {props.children}
    </TourContext.Provider>
  );
};

export const TourState = () => {
  return useContext(TourContext);
};

export default TourProvider;