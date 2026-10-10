import React from 'react';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="banner">

        {/* Left side */}
        <div className="relative z-10 flex-1 flex flex-col items-start justify-center gap-8 px-8 py-12 md:px-16 md:py-16 lg:py-24">
          <h2 className="t-h1 on-dark">
            <span className="block">Book appointment</span>
            <span className="block mt-2 font-semibold">with 100+ trusted doctors</span>
          </h2>
          <button
            onClick={() => {
              navigate('/login');
              scrollTo(0, 0);
            }}
            className="btn btn-light"
          >
            Create account
          </button>
        </div>

        {/* Right side */}
        <div className="hidden md:block banner__img">
          <img
            className="block w-full max-w-md ml-auto"
            src="https://res.cloudinary.com/dophfzeep/image/upload/v1742035283/appointment_img_auu3bp.png"
            alt="appointment_img"
          />
        </div>

      </div>
    </section>
  );
}

export default Banner;
