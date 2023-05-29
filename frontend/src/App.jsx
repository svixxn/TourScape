import { AuthProvider, RequireAuth } from 'react-auth-kit'
import { Routes, Route } from 'react-router-dom';
import TourProvider from './context/TourProvider';
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import Destinations from './components/Destination/Destinations';
import SingleDestination from './components/Destination/SingleDestination';
import NotFound from './components/Pages/NotFound';
import Navbar from './components/HeadFoot/Navbar'
import Footer from './components/HeadFoot/Footer';
import Home from './components/Home/Home';
import { Analytics } from '@vercel/analytics/react';
import './App.css'
import Tours from './components/Tour/Tours';
import SingleTour from './components/Tour/SingleTour';
import MyCabinet from './components/My/MyCabinet';
import AdminPanel from './components/AdminPanel/AdminPanel';
import RequireAdmin from './components/Utils/RequireAdmin';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <AuthProvider
        authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "http:"}
      >
        <TourProvider>
        <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/destinations">
              <Route index element={<Destinations />}></Route>
              <Route path=":slug" element={<SingleDestination />}></Route>
            </Route>
            <Route path="/tours">
              <Route index element={<Tours />}></Route>
              <Route path=":slug" element={<SingleTour />}></Route>
            </Route>

            <Route path='/my' element={
              <RequireAuth loginPath='/login'>
                <MyCabinet />
              </RequireAuth>
            }></Route>
            <Route path='/adminpanel' element={
              <RequireAuth loginPath='/login'>
                <RequireAdmin>
                  <AdminPanel />
                </RequireAdmin>
              </RequireAuth>
            }></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </TourProvider>
      </AuthProvider >
      <Analytics />
    </>
  );
}

export default App
