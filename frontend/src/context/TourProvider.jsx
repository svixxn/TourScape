import { createContext, useContext, useEffect, useState } from 'react';
// import Cookies from 'universal-cookie';
// import axios from 'axios';


const TourContext = createContext({});

const TourProvider = (props) => {
  const [user, setUser] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {

  }, []);
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