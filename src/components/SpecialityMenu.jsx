import React from 'react';
import { specialityData } from '../assets/assets.js';
import { Link } from 'react-router-dom';

function SpecialityMenu() {

  return (
    <section id='speciality' className='section grid lg:grid-cols-12 gap-8 lg:gap-12'>
      <div className='lg:col-span-4 flex flex-col gap-6'>
        <h2 className='t-h2'>Find by speciality</h2>
        <p className='lede muted max-w-[36ch]'>
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
        </p>
      </div>

      <div className='lg:col-span-8 spec-grid'>
        {specialityData.map((item, index) => (
          <Link onClick={() => scrollTo(0, 0)} className='spec-item' key={index} to={`/doctors/${item.speciality}`}>
            <img src={item.image} alt="speciality_img" />
            <span>{item.speciality}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SpecialityMenu;
