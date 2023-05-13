/* eslint-disable react/prop-types */
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs'


const LineWithTextArrow = ({ content, isOpen = true }) => {
   return (
      <div className="flex py-2 items-center">
         <div className="flex-grow border-t border-gray-400"></div>
         <div className="flex-shrink flex flex-row items-center gap-2 mx-4 text-gray-400">
            {content} {isOpen ?  (<BsArrowUpCircle />): (<BsArrowDownCircle />)}
         </div>
         <div className="flex-grow border-t border-gray-400"></div>
      </div >
   )
}

export default LineWithTextArrow