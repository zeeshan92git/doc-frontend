import React from 'react';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse md:flex-row items-center bg-primary rounded-lg sm:p-10 md:p-12 lg:p-16 my-10 mx-4 sm:mx-8 md:mx-16 lg:mx-28">
      
      {/* Left side */}
      <div className="flex-1 text-center md:text-left py-2">
        <div className="text-2xl text-white font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          <p>Book Appointment</p>
          <p className="mt-2 sm:mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate('/login');
            scrollTo(0, 0);
          }}
          className="bg-white text-primary text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-full mt-6 hover:bg-blue-800 hover:text-white hover:scale-105 transition-all"
        >
          Create Account
        </button>
      </div>

      {/* Right side */}
      <div className="w-1/3 md:w-1/3 flex justify-center md:justify-end mb-6 md:mb-0">
        <img
          className="hidden md:block w-64 sm:w-80 md:w-full max-w-xs md:max-w-md"
          src="https://res.cloudinary.com/dophfzeep/image/upload/v1742035283/appointment_img_auu3bp.png"
          alt="appointment_img"
        />
      </div>
      
    </div>
  );
}

export default Banner;
