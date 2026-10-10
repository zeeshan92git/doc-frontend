import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import { Leaf, RefreshCw } from "lucide-react";

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
      <section className="section">
        <div className="tip">
          <div className="tip__media">
            <img key={randomTip.image} src={randomTip.image} alt="Health Tip" className="fade-in" />
          </div>

          <div className="tip__body">
            <h2 className="t-h3 flex items-center gap-2">
              <Leaf size={22} className="text-[var(--ok)]" />
              Daily health tip
            </h2>

            <p key={randomTip.text} className="tip__text fade-in">
              "{randomTip.text}"
            </p>

            <button onClick={generateRandomTip} className="btn mt-8 self-start">
              <RefreshCw size={16} />
              New tip
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
export default Home;
