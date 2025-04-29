import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


const RelatedDoctors = ({ docId, speciality }) => {

    const { doctorsData } = useContext(AppContext);
    const [relDoc, setrelDoc] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (doctorsData.length > 0 && speciality) {
            let Doctors = doctorsData.filter((doc) => doc.speciality === speciality && doc._id != docId);
            setrelDoc(Doctors);
        }

    }, [doctorsData, docId, speciality]);



    return (
        <>
            <div className='flex flex-col gap-3 items-center my-4 md:mx-10  text-gray-700'>
                <h1 className='text-2xl  font-medium '>Related Doctors</h1>
                <p className='text-sm sm:w-1/3 text-center  '>Simply browse through our extensive list of trusted doctors.</p>
            </div>
             {/* Doctors Grid */}
            {
                relDoc.length > 0 ? (
                    <div className='w-full grid grid-cols-auto gap-4 pt-5  gap-y-6 px-3 sm:px-0 mb-4 '>
                        {relDoc.map((item, index) => (
                            <div onClick={() => navigate(`/appointment/${item._id}`, scrollTo(0, 0))} key={index} className='border border-blue-300 rounded-xl  overflow-hidden cursor-pointer  hover:translate-y-[-10px] transition-all duration-500 '>
                                <img className='bg-blue-50 hover:bg-blue-500 object-contain' src={item.image} alt="doc_img" />
                                <div className='p-4'>
                                    <div className={`flex items-center gap-2 text-center text-sm ${item.available ? 'text-green-500' : 'text-gray-500'} `}>
                                        <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'} `}></p>
                                        <p>{item.available ? 'Available' : 'Not Available'} </p>
                                    </div>
                                    <p className='text-lg text-gray-900 font-medium'>{item.name}</p>
                                    <p className='text-gray-900 text-sm '>{item.speciality}</p>
                                </div>
                            </div>
                        ))}
                    </div>)
                    :
                    (<div className=' text-gray-700 text-sm sm:w-1/3 text-center   mb-4  '>No related doctor found.</div>)
            }

        </>
    )
};

export default RelatedDoctors;