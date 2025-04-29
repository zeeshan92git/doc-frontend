import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

function TopDoctors() {

  const navigate = useNavigate();
  const { doctorsData } = useContext(AppContext); 

  return (
    <div className="flex flex-col items-center gap-6 my-16 px-6 md:px-10 lg:px-28 text-gray-900  pb-2">
      
      <h1 className="text-2xl sm:text-3xl font-semibold text-center">Top Doctors to Book</h1>
      
      
      <p className="w-full sm:w-2/3 md:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted Doctors.
      </p>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {doctorsData.map((item, index) => (
          <div 
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border border-blue-300 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-[5px] transition-transform duration-300 bg-white shadow-sm"
          >
           
            <img 
              className="w-full h-48 object-contain bg-blue-50 hover:bg-blue-500 transition-colors duration-300" 
              src={item.image} 
              alt="doc_img" 
            /> 
            
            {/* Doctor Info */}
            <div className="p-4 flex flex-col gap-2">
              
              <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-400'}`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              
              
              <p className="text-lg font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button  
        onClick={() => { 
          navigate('/doctors'); 
          scrollTo(0, 0); 
        }}
        className="bg-blue-100 hover:bg-blue-500 hover:text-white  px-10 py-3 mt-10 font-medium text-gray-700  rounded-full flex items-center gap-2 transition-colors duration-300"
      >
        More &rarr;
      </button>

    </div>
  )
}

export default TopDoctors;
