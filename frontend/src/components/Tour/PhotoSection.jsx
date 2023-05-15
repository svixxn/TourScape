/* eslint-disable react/prop-types */
const PhotoSection = ({tour}) => {
  return (
   <div className='container mx-auto grid grid-cols-12 justify-items-stretch gap-4 pt-6'>
   <img src={`${tour.photo[1]}`} alt="photo" className='rounded col-span-8' />
   <div className='col-span-4 flex flex-col gap-2'>
     <img src={`${tour.photo[2]}`} alt="photo" className='h-full rounded' />
     <img src={`${tour.photo[0]}`} alt="photo" className='h-full rounded' />
   </div>
 </div>
  )
}

export default PhotoSection