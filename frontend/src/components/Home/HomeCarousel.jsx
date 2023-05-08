import { useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled, RxDot } from 'react-icons/rx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Drawer from './Drawer';
import { TourState } from '../../context/TourProvider';

const HomeCarousel = () => {
   const slides = [
      {
         url: 'https://res.cloudinary.com/tourscape/image/upload/v1683554251/TourScape/Static/1_mq2wge_tagrzm.jpg',
      },
      {
         url: 'https://res.cloudinary.com/tourscape/image/upload/v1683554250/TourScape/Static/2_ai384x_l07sma.jpg'
      },
      {
         url: 'https://res.cloudinary.com/tourscape/image/upload/v1683554251/TourScape/Static/3_agwr6l_mlgmba.jpg'
      }
   ];

   const [currentIndex, setCurrentIndex] = useState(0);
   const [search, setSearch] = useState("")
   const {isDrawerOpen, setIsDrawerOpen} = TourState()

   const prevSlide = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
   };

   const nextSlide = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
   };

   const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
   };

   //TODO: add search func
   const searchHandler = () => {
      if (!search) {
         toast.error('Search is empty!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
         return;
      }
      setIsDrawerOpen(!isDrawerOpen)
   }

   return (
      <div className='max-w-[1900px] h-[780px] w-full m-auto py-16 px-4 relative group'>
         <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className='w-full h-full rounded-2xl bg-center bg-cover duration-500 flex flex-col items-center justify-center text-white font-bold dark-overlay relative'
         >
            <div className='flex flex-row w-full justify-center items-center z-10'>
               <input type="text" className='rounded-full p-5 border-none w-[29rem] text-black' placeholder='Where are you traveling to?' onChange={(e) => setSearch(e.target.value)} />
               <button className='bg-pink-600 p-5 w-44 rounded-full ml-[-11.5rem] h-14 text-center leading-none' onClick={searchHandler}>Search</button>
               <ToastContainer />
            </div>
            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} search={search} setSearch={setSearch}>
            </Drawer>
            <p className='text-2xl text-center mt-4 z-10'><span className='text-6xl font-bold'>Excursions</span> <br />around the world</p>
         </div>
         {/* Left Arrow */}
         <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
         </div>
         {/* Right Arrow */}
         <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} size={30} />
         </div>
         <div className='flex top-4 justify-center py-2'>
            {slides.map((slide, slideIndex) => (
               <div
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className='text-2xl cursor-pointer'
               >
                  {slideIndex === currentIndex ? <RxDotFilled /> : <RxDot />}
               </div>
            ))}
         </div>
      </div>
   );
}

export default HomeCarousel