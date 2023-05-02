import TourProvider from './context/TourProvider';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import './App.css'
import Main from './components/Destination/Main';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <>
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
    </>
  );
}

export default App
