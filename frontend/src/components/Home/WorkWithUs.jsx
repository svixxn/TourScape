import { FaMoneyBillWave, FaLightbulb, FaHandPeace } from "react-icons/fa"
import LineWithText from "../Utils/LineWithText"

const WorkWithUs = () => {
   return (
      <div className='container mx-auto text-center'>
         <LineWithText content={"Work with us"}/>
         <div className='my-10 flex flex-row items-center'>
            <div className='flex flex-col justify-center items-center'>
               <FaMoneyBillWave className="text-5xl" />
               <p className="text-3xl mb-3">Best prices on the market</p>
               <p className="text-xl">We provide best prices to all of out tours. If you will find a tour with similar attractions and lower price, we will provide you with a discount.</p>
            </div>
            <div className='flex flex-col justify-center items-center px-6'>
               <FaLightbulb className="text-5xl" />
               <p className="text-3xl mb-3">Unique tours</p>
               <p className="text-xl">All tours that are provided on the website are unique. You will not found exact tours anywhere else. If so, contact us and get a discount!</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
               <FaHandPeace className="text-5xl" />
               <p className="text-3xl mb-3">Supportive team</p>
               <p className="text-xl">Catch a problem or got a question? Feel free to contact our team whenever you want. We ready to answer to all your questions!</p>
            </div>
         </div>
      </div>
   )
}

export default WorkWithUs