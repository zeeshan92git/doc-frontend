import React from 'react';
import { specialityData } from '../assets/assets.js';
import { Link } from 'react-router-dom';

function SpecialityMenu() {
   
  return (

    <div id='speciality' className='flex flex-col items-center gap-4 text-gray-800 py-16 lg:mx-28 '>  
        <h1 className='font-medium  text-3xl '>Find by Speciality</h1>
        <p className='sm:w-1/3 text-center text-sm '>
        Simply browse through our extensive list of trusted doctors, 
        schedule your appointment hassle-free.
        </p>

        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {specialityData.map((item , index)=>(
                <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
                <img className='w-16 sm:w-24 mb-2 ' src={item.image} alt="speciality_img" />
                <p className=''>{item.speciality}</p>
                </Link>
            ))}
        </div> 
    </div>
  )
}

export default SpecialityMenu;