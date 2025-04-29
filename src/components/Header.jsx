import React from 'react';
import { MoveRight } from "lucide-react";

function Header() {
  return (
    <div className="flex flex-col lg:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-20 mx-4 my-10  sm:mx-10 md:mx-20 lg:mx-28 overflow-hidden ">
      
      {/* Left side */}
      <div className="flex-1 flex flex-col items-center lg:items-start justify-center gap-6 py-16 md:py-28 text-center lg:text-left">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book Appointment <br />
          With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img
            className="w-28"
            src="https://res.cloudinary.com/dophfzeep/image/upload/v1741950576/group_profiles_opjrss.png"
            alt="group_profiles_img"
          />
          <p>
            Simply browse through our extensive list of trusted doctors &  
            <br className="hidden md:block" />
            schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm hover:bg-blue-800 hover:font-semibold hover:text-white hover:scale-105 transition-all duration-300"
        >
          Book Appointment
          <MoveRight />
        </a>
      </div>

      {/* Right side */}
      <div className="relative w-full lg:w-1/2 mt-10 lg:mt-0">
        {/* Image only visible on large screens and above */}
        <img
          className="hidden lg:block absolute bottom-0 right-0 w-full max-w-lg object-contain"
          src="https://res.cloudinary.com/dophfzeep/image/upload/v1741950593/header_img_zqsvkx.png"
          alt="header_img"
        />
      </div>
    </div>
  );
}

export default Header;
