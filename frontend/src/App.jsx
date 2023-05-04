import { AuthProvider } from 'react-auth-kit'
import { Routes, Route } from 'react-router-dom';
import TourProvider from './context/TourProvider';
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import Destinations from './components/Destination/Destinations';
import NotFound from './components/NotFound/NotFound';
import Navbar from './components/HeadFoot/Navbar'
import Footer from './components/HeadFoot/Footer';
import Home from './components/Home';
import './App.css'

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
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/destinations">
              <Route index element={<Destinations />}></Route>
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </TourProvider>
      </AuthProvider>
    </>
  );
}

export default App
