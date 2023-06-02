import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import LineWithText from '../Utils/LineWithText'
import { RotatingLines } from 'react-loader-spinner'
import SingleTourCard from '../Destination/SingleTourCard'
const Tours = () => {
   const [destinations, setDestinations] = useState([])
   const [tours, setTours] = useState([])
   const [results, setResults] = useState(0)
   const [isLoading, setIsLoading] = useState(false)

   const [destination, setDestination] = useState(null)
   const [isDestinationOpen, setIsDestinationOpen] = useState(false)
   const [duration, setDuration] = useState(null)
   const [isDurationOpen, setIsDurationOpen] = useState(false)
   const [minPrice, setMinPrice] = useState(null)
   const [isMinPriceOpen, setIsMinPriceOpen] = useState(false)
   const [maxPrice, setMaxPrice] = useState(null)
   const [isMaxPriceOpen, setIsMaxPriceOpen] = useState(false)

   const durationList = []
   const minPricesList = []
   const maxPricesList = []

   for (let i = 0; i <= 10; i++) {
      durationList.push(<li key={i} className={`p-2 text-sm hover:bg-pink-600 hover:text-white cursor-pointer ${i === duration?.toLowerCase() && 'bg-pink-600 text-white'}`} onClick={() => { setDuration(`${i}`); setIsDurationOpen(prevState => !prevState) }}>{i} hours</li>)
   }

   for (let i = 10; i <= 320; i *= 2) {
      minPricesList.push(<li key={i} className={`p-2 text-sm hover:bg-pink-600 hover:text-white cursor-pointer ${i === minPrice?.toLowerCase() && 'bg-pink-600 text-white'}`} onClick={() => { setMinPrice(`${i}`); setIsMinPriceOpen(prevState => !prevState) }}>{i} $</li>)
      maxPricesList.push(<li key={i} className={`p-2 text-sm hover:bg-pink-600 hover:text-white cursor-pointer ${i === maxPrice?.toLowerCase() && 'bg-pink-600 text-white'}`} onClick={() => { setMaxPrice(`${i}`); setIsMaxPriceOpen(prevState => !prevState) }}>{i} $</li>)
   }


   useEffect(() => {
      const fetchTours = async () => {
         try {
            setIsLoading(true)
            let queryParams = {};
            if (destination) {
               queryParams.destination = destination;
            }
            if (duration) {
               queryParams.duration = duration;
            }
            if (minPrice && maxPrice) {
               queryParams['price[gt]'] = minPrice;
               queryParams['price[lt]'] = maxPrice;
            } else if (minPrice) {
               queryParams['price[gt]'] = minPrice;
            } else if (maxPrice) {
               queryParams['price[lt]'] = maxPrice;
            }
            const config = {
               params: queryParams,
               headers: {
                  'Content-type': 'application/json',
               },
            };
            const { data } = await axios.get('/api/tours', config);
            setTours(data.data.data);
            setResults(data.results);
            setIsLoading(false)
         } catch (error) {
            console.log(error);
         }
      };
      fetchTours();
   }, [destination, duration, minPrice, maxPrice]);


   useEffect(() => {
      (async () => {
         try {
            const config = {
               headers: {
                  "Content-type": "application/json",
               },
            };
            const { data } = await axios.get(
               "/api/destinations",
               config
            );
            setDestinations(data.data.data)
         } catch (error) {
            console.log(error)
         }
      })();
   }, [])

   return (
      <div className="container mx-auto mb-16 mt-6">
         <span className='text-3xl font-bold'>Filtering</span>
         <div className="flex flex-row justify-between my-4">
            <div className='w-72 font-medium'>
               <div onClick={() => setIsDestinationOpen(prevState => !prevState)} className={`bg-white hover:bg-gray-300 border-2 transition-all w-full p-2 flex items-center justify-between rounded text-center ${!destination && 'text-gray-500'}`}>
                  {destination ? destination : "Select Destination"}
                  <BsChevronDown className={`ml-2 ${isDestinationOpen && 'rotate-180'}`} />
               </div>
               <ul className={`bg-white mt-2 overflow-y-auto transition-all ${isDestinationOpen ? 'max-h-40' : 'max-h-0'}`}>
                  <li className={`p-2 text-sm hover:bg-pink-600 hover:text-white cursor-pointer `} onClick={() => { setDestination(null); setIsDestinationOpen(prevState => !prevState) }}>Any City</li>
                  {destinations?.map((country, index) => (
                     <li key={index} className={`p-2 text-sm hover:bg-pink-600 hover:text-white cursor-pointer ${country?.name.toLowerCase() === destination?.toLowerCase() && 'bg-pink-600 text-white'}`} onClick={() => { setDestination(country.name); setIsDestinationOpen(prevState => !prevState) }}>{country.name}</li>
                  ))}
               </ul>
            </div>

            <div className='w-72 font-medium'>
               <div onClick={() => setIsDurationOpen(prevState => !prevState)} className={`bg-white hover:bg-gray-300 border-2 transition-all w-full p-2 flex items-center justify-between rounded text-center ${!duration && 'text-gray-500'}`}>
                  {duration ? duration + " hours" : "Select Duration"}
                  <BsChevronDown className={`ml-2 ${isDurationOpen && 'rotate-180'}`} />
               </div>
               <ul className={`bg-white mt-2 overflow-y-auto transition-all ${isDurationOpen ? 'max-h-40' : 'max-h-0'}`}>
                  <li className={`p-2 text-sm hover:bg-pink-600 hover:text-white cursor-pointer `} onClick={() => { setDuration(null); setIsDurationOpen(prevState => !prevState) }}>Any duration</li>
                  {durationList}
               </ul>
            </div>

            <div className='w-72 font-medium'>
               <div onClick={() => setIsMinPriceOpen(prevState => !prevState)} className={`bg-white hover:bg-gray-300 border-2 transition-all w-full p-2 flex items-center justify-between rounded text-center ${!minPrice && 'text-gray-500'}`}>
                  {minPrice ? minPrice + " $" : "Select min. price"}
                  <BsChevronDown className={`ml-2 ${isMinPriceOpen && 'rotate-180'}`} />
               </div>
               <ul className={`bg-white mt-2 overflow-y-auto transition-all ${isMinPriceOpen ? 'max-h-40' : 'max-h-0'}`}>
                  <li className={`p-2 text-sm hover:bg-pink-600 hover:text-white cursor-pointer `} onClick={() => { setMinPrice(null); setIsMinPriceOpen(prevState => !prevState) }}>Any min. price</li>
                  {minPricesList}
               </ul>
            </div>

            <div className='w-72 font-medium'>
               <div onClick={() => setIsMaxPriceOpen(prevState => !prevState)} className={`bg-white hover:bg-gray-300 border-2 transition-all w-full p-2 flex items-center justify-between rounded text-center ${!maxPrice && 'text-gray-500'}`}>
                  {maxPrice ? maxPrice + " $" : "Select max. price"}
                  <BsChevronDown className={`ml-2 ${isMaxPriceOpen && 'rotate-180'}`} />
               </div>
               <ul className={`bg-white mt-2 overflow-y-auto transition-all ${isMaxPriceOpen ? 'max-h-40' : 'max-h-0'}`}>
                  <li className={`p-2 text-sm hover:bg-pink-600 hover:text-white cursor-pointer `} onClick={() => { setMaxPrice(null); setIsMaxPriceOpen(prevState => !prevState) }}>Any max. price</li>
                  {maxPricesList}
               </ul>
            </div>
         </div>
         <LineWithText content={`Results (${results})`} />
         {isLoading ? (
            <div className="flex flex-row justify-center mt-2">
               <RotatingLines
                  strokeColor="pink"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="42"
                  visible={true}
               />
            </div>
         ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
               {tours.length > 0 ? tours.map((tour, index) => (
                  <SingleTourCard key={index} tour={tour} />
               )) : (<div className='text-4xl text-primary mb-72'>Tours not found.</div>)}
            </div>
         )}

      </div>
   )
}

export default Tours
