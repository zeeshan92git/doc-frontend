import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import { Sparkles } from "lucide-react";
const Home = () => {

  const healthTips = [
    {
      text: "Drink plenty of water throughout the day for optimal health and  stay hydrated!",
      image: "https://res.cloudinary.com/dophfzeep/image/upload/v1745848322/johnny-mcclung-uDM99xirqI4-unsplash_vyanke.jpg",
    },
    {
      text: "Get at least 7-8 hours of sleep each night to support physical and mental well-being.",
      image: "https://res.cloudinary.com/dophfzeep/image/upload/v1745758474/slumber-sleep-aid-kh2VDcogqog-unsplash_hbyhr4.jpg",
    },
    {
      text: "Take a 30-minute walk daily to improve heart health.",
      image: "https://res.cloudinary.com/dophfzeep/image/upload/v1745758532/holly-mandarich-UVyOfX3v0Ls-unsplash_pmgtsf.jpg",
    },
    {
      text: "Eat more fruits and vegetables for a stronger immune system.",
      image: "https://res.cloudinary.com/dophfzeep/image/upload/v1745758557/natalie-walters-l2AnTPLBzBk-unsplash_tucrka.jpg",
    },
  ]

  const [randomTip, setRandomTip] = useState(healthTips[0]);

  const generateRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * healthTips.length);
    setRandomTip(healthTips[randomIndex]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      generateRandomTip();
    }, 5000); // change tip every 5 seconds

    return () => clearInterval(interval); // cleanup when component unmounts
  }, []);

  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />

      {/* Healthy tips section */}
      <div className="px-6 py-10 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-3xl shadow-2xl my-12 mx-6 md:mx-16 lg:mx-28">

        {/* Heading */}
        <h2 className="flex justify-center items-center gap-1 text-2xl sm:text-3xl font-extrabold mb-8 text-center text-purple-700 font-serif tracking-wide">
          <span className="text-yellow-400"><Sparkles /></span>
          <span>Daily Health Tip</span>
          <span className="text-yellow-400"><Sparkles /></span>
        </h2>

        <div className="flex flex-col items-center">

          <div className="overflow-hidden rounded-xl shadow-lg mb-6 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <img
              src={randomTip.image}
              alt="Health Tip"
              className="w-full h-48 sm:h-56 md:h-60 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <p className="text-lg sm:text-xl text-gray-800 italic text-center px-2 sm:px-6 md:px-12 leading-relaxed">
            "{randomTip.text}"
          </p>

          <button
            onClick={generateRandomTip}
            className="flex items-center gap-2 mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span className="text-yellow-400"><Sparkles /></span>
            New Tip
          </button>

        </div>
      </div>

    </div>
  )
}
export default Home; 