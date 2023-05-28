import { AiOutlineMail } from "react-icons/ai"
import { FaTelegram, FaTwitter, FaInstagram, FaGithub, FaGlobeEurope, FaHome, FaPhone } from 'react-icons/fa'


function Footer() {
  return (
    <footer
      className="text-center bg-neutral-800 text-neutral-200 lg:text-left mt-4">
      <div
        className="flex items-center justify-center border-b-2 p-6 border-neutral-500 lg:justify-between">
        <div className="mr-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="flex justify-center">
          <a href="https://t.me/yoskrilldroppinhard" className="mr-6">
            <FaTelegram size={25} />
          </a>
          <a href="https://twitter.com/kijbakovec" className="mr-6">
            <FaTwitter size={25} />
          </a>
          <a href="https://instagram.com/svixxn" className="mr-6">
            <FaInstagram size={25} />
          </a>
          <a href="https://github.com/svixxn">
            <FaGithub size={25} />
          </a>
        </div>
      </div>
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="">
            <h6
              className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              <FaGlobeEurope className='mr-3 h-5 w-5' />
              TourScape
            </h6>
            <p>
              All tours that are provided are unique, with unique destinations and unique pricing. If you have any questions, please be free to contact us.
            </p>
          </div>
          <div className="">
            <h6
              className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              General
            </h6>
            <p className="mb-4">
              <a href="#!"
              >Destinations</a
              >
            </p>
            <p className="mb-4">
              <a href="#!"
              >Tours</a
              >
            </p>
            <p className="mb-4">
              <a href="#!"
              >Hotels</a
              >
            </p>
          </div>
          <div className="">
            <h6
              className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Useful links
            </h6>
            <p className="mb-4">
              <a href="#!"
              >Log in/Sign Up</a
              >
            </p>
            <p className="mb-4">
              <a href="#!"
              >Settings</a
              >
            </p>
            <p className="mb-4">
              <a href="#!"
              >My Bookings</a
              >
            </p>
          </div>
          <div>
            <h6
              className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <FaHome className='mr-3 h-5 w-5' />
              Zhytomyr, Kyivskya str.
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <AiOutlineMail className='mr-3 h-5 w-5' />
              kn211_bmo@student.ztu.edu.ua
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <FaPhone className='mr-3 h-5 w-5' />
              +(380) 96-554-49-24
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-pink-800 to-pink-400 p-6 text-center">
        <span>© {new Date().getFullYear()} Copyright: </span>
        <a
          className="font-semibold"
          href="/"
        >TourScape</a
        >
      </div>
    </footer>
  )
}

export default Footer