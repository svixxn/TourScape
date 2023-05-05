import React, { useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled, RxDot } from 'react-icons/rx';

const HomeCarousel = () => {
   const slides = [
      {
         url: '../../../public/1.jpg',
      },
      {
         url: '../../../public/2.jpg'
      },
      {
         url: '../../../public/3.jpg'
      }
   ];

   const [currentIndex, setCurrentIndex] = useState(0);

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

   return (
      //TODO: add input and text to slides
      <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
         <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})`, filter: "brightness(70%)"

         }}
            className='w-full h-full rounded-2xl bg-center bg-cover duration-500 flex flex-col items-center text-white font-bold'
         >
            <div className='mt-auto mb-10'>The Best Activities</div>
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
                  {slideIndex === currentIndex? <RxDotFilled />: <RxDot />}
               </div>
            ))}
         </div>
      </div>
   );
}

export default HomeCarousel