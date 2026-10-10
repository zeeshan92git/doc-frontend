import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import DoctorCard from './DoctorCard.jsx';


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
        <section className='section'>
            <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12'>
                <h2 className='t-h2'>Related doctors</h2>
                <p className='lede muted max-w-[36ch]'>Simply browse through our extensive list of trusted doctors.</p>
            </div>

            {/* Doctors Grid */}
            {
                relDoc.length > 0 ? (
                    <div className='doc-grid'>
                        {relDoc.map((item, index) => (
                            <DoctorCard
                                key={index}
                                item={item}
                                index={index}
                                onClick={() => navigate(`/appointment/${item._id}`, scrollTo(0, 0))}
                            />
                        ))}
                    </div>)
                    :
                    (<p className='muted'>No related doctor found.</p>)
            }
        </section>
    )
};

export default RelatedDoctors;
