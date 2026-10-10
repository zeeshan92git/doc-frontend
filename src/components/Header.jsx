import React from 'react';
import { MoveRight } from "lucide-react";

function Header() {
  return (
    <section className="grid lg:grid-cols-12 gap-8 items-end pt-8 pb-16 lg:pt-16 lg:pb-24">

      {/* Left side */}
      <div className="lg:col-span-7 flex flex-col items-start gap-8 relative z-10">
        <h1 className="t-display">
          <span className="mask"><span style={{ '--i': 0 }}>Book appointment</span></span>
          <span className="mask"><span style={{ '--i': 1 }}><b>with trusted</b></span></span>
          <span className="mask"><span style={{ '--i': 2 }}><b>doctors</b></span></span>
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 reveal" style={{ '--i': 5 }}>
          <img
            className="w-32"
            src="https://res.cloudinary.com/dophfzeep/image/upload/v1741950576/group_profiles_opjrss.png"
            alt="group_profiles_img"
          />
          <p className="lede muted max-w-[44ch]">
            Simply browse through our extensive list of trusted doctors &amp; schedule your appointment hassle-free.
          </p>
        </div>

        <a href="#speciality" className="btn btn-solid reveal" style={{ '--i': 6 }}>
          Book appointment
          <MoveRight size={18} />
        </a>
      </div>

      {/* Right side: image only on large screens and above */}
      <div className="hidden lg:block lg:col-span-5 reveal" style={{ '--i': 3 }}>
        <div className="hero-art">
          <div className="hero-art__fill arch">
            <img src="https://res.cloudinary.com/dophfzeep/image/upload/v1741950593/header_img_zqsvkx.png" alt="header_img" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
