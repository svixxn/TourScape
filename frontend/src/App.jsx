import TourProvider from './context/TourProvider';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import { AuthProvider } from 'react-auth-kit'
import './App.css'
import Main from './components/Destination/Main';
import NotFound from './components/NotFound/NotFound';

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
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="about" element={<h1>About</h1>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </TourProvider>
      </AuthProvider>
    </>
  );
}

export default App
