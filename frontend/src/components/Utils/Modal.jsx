/* eslint-disable react/prop-types */
const Modal = ({visible, onClose, children}) => {
   if(!visible) return null;
   
   const handleOnClose = (e) => {
      if(e.target.id === 'container') onClose();
   }


   return (
      <div id="container" onClick={handleOnClose} className="fixed inset-0 text-white bg-opacity-70 bg-black backdrop-blur-sm flex justify-center items-center">
         {children}
      </div>

   )
}

export default Modal