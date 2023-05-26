/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';


const TourContext = createContext({});

const TourProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    let userInfo;
    if (Cookies.get('_auth_state'))
      userInfo = JSON.parse(Cookies.get('_auth_state'))
    if (userInfo) setUser(userInfo)
    else setUser(null)
    setLoadUser(false)
  }, [loadUser]);

  return (
    <TourContext.Provider
      value={{
        user, setUser,
        loadUser, setLoadUser,
        isDrawerOpen, setIsDrawerOpen
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