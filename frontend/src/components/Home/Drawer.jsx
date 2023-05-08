/* eslint-disable react/prop-types */


const Drawer = ({ isOpen, setIsOpen, search, setSearch }) => {
   const searchHandler = (e) => {
      setSearch(e)
   }

   return (
      <div
         className={
            "fixed z-30 bg-slate-950 bg-opacity-40 inset-0 transform ease-in-out flex flex-row" +
            (isOpen
               ? "transition-opacity opacity-100 duration-500 translate-x-0"
               : "transition-all duration-200 opacity-0 translate-x-full")
         }
      >
         <div className="flex flex-col w-96 h-full bg-gradient-to-tr from-pink-900 to-pink-600 m-0">
            <div className="px-4 py-3 border-b">
               <h2 className="text-lg font-medium">Search destinations</h2>
               <input type="text" className='rounded-md px-4 py-2 border-none w-72 text-black' placeholder='Poltava' value={search} onChange={(event) => searchHandler(event.target.value)}/>
            </div>
            <div className="px-4">
               <p>{search}</p>
            </div>
         </div>
         <section
            className='w-full h-full cursor-pointer'
            onClick={() => {
               setIsOpen(false);
            }}
         ></section>
      </div>
   )
}

export default Drawer