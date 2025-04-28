import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Search } from 'lucide-react';


function Doctor() {
    const params = useParams(); // returns an object
    const { speciality } = params;

    const { doctorsData } = useContext(AppContext);
    // console.log(doctorsData);

    const [showFilter, setshowFilter] = useState(false);

    const [filterDoc, setfilterDoc] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (doctorsData) {
            if (speciality) {
                setfilterDoc(doctorsData.filter(doc => doc.speciality === speciality));
            } else {
                setfilterDoc(doctorsData);
            }
        }
    }, [doctorsData, speciality]);

    if (!doctorsData) {
        return <div>Loading...</div>; // Add loading state
    }

    return (
        <div>
            <p className='text-gray-600'>Browse through the specialist doctors.</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

                <div className={`flex items-center border bg-blue-50 border-blue-100 text-gray-700 text-sm p-1  rounded  transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""}`}>
                    <Search size={15} />
                    <button onClick={() => setshowFilter(!showFilter)} className={`py-1 px-3`}>Search by Speciality</button>
                </div>

                <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"}`}>
                    <p onClick={() => { speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician'); setshowFilter(!showFilter) }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer   ${speciality === 'General physician' ? "bg-blue-100 text-black" : ""}`}>General physician</p>
                    <p onClick={() => { speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist'); setshowFilter(!showFilter) }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === 'Gynecologist' ? "bg-blue-100 text-black" : ""}`}>Gynecologist</p>
                    <p onClick={() => { speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist'); setshowFilter(!showFilter) }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? "bg-blue-100 text-black" : ""}`}>Dermatologist</p>
                    <p onClick={() => { speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatrician'); setshowFilter(!showFilter) }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatrician' ? "bg-blue-100 text-black" : ""}`}>Pediatrician</p>
                    <p onClick={() => { speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist'); setshowFilter(!showFilter) }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? "bg-blue-100 text-black" : ""}`}>Neurologist</p>
                    <p onClick={() => { speciality === 'Gasteroenterologist' ? navigate('/doctors') : navigate('/doctors/Gasteroenterologist'); setshowFilter(!showFilter) }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gasteroenterologist' ? "bg-blue-100 text-black" : ""}`}>Gasteroenterologist</p>
                </div>



                <div className='w-full grid grid-cols-auto gap-4  gap-y-6 '>
                    {filterDoc.map((item, index) => (
                        <div
                            onClick={() => navigate(`/appointment/${item._id}`)}
                            key={index}
                            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                        >
                            <img className='bg-blue-50 hover:bg-blue-500' src={item.image} alt='doc_img' />
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
                </div>

            </div>
        </div>
    );
}

export default Doctor;