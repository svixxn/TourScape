import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from "axios"


const TourContext = createContext({});

const TourProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false)
  const [destinations, setDestinations] = useState(null);

  useEffect(() => {
    let userInfo;
    if (Cookies.get('_auth_state'))
      userInfo = JSON.parse(Cookies.get('_auth_state'))
    if (userInfo) setUser(userInfo)
    else setUser(null)
    setLoadUser(false)
  }, [loadUser]);

  //TODO: data is null
  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        "/api/destinations",
        config
      );
      setDestinations(data)
    })
  }, [destinations])


  return (
    <TourContext.Provider
      value={{
        user, setUser,
        loadUser, setLoadUser,
        destinations, setDestinations
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const TourState = () => {
  return useContext(TourContext);
};

export default TourProvider;