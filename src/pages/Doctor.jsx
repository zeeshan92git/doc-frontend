import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Search } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';

// `toggleKey` keeps the original per-item toggle comparison untouched
// (the original compared Pediatrician against 'Pediatricians').
const FILTERS = [
    { label: 'General physician' },
    { label: 'Gynecologist' },
    { label: 'Dermatologist' },
    { label: 'Pediatrician', toggleKey: 'Pediatricians' },
    { label: 'Neurologist' },
    { label: 'Gasteroenterologist' },
];

function Doctor() {
    const params = useParams(); // returns an object
    const { speciality } = params;

    const { doctorsData } = useContext(AppContext);

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
        return <div className="section muted">Loading...</div>; // Add loading state
    }

    return (
        <div className="pb-16">
            <header className="grid lg:grid-cols-12 gap-6 pt-8 pb-12 lg:pt-16">
                <h1 className="t-h1 lg:col-span-7 reveal">Find your doctor</h1>
                <p className="lede muted lg:col-span-5 lg:self-end reveal" style={{ '--i': 1 }}>Browse through the specialist doctors.</p>
            </header>

            <div className='flex flex-col sm:flex-row items-start gap-8 lg:gap-12'>

                <button
                    onClick={() => setshowFilter(!showFilter)}
                    className={`btn btn-sm sm:hidden ${showFilter ? "btn-solid" : ""}`}
                >
                    <Search size={16} />
                    Search by speciality
                </button>

                <div className={`flex-col w-full sm:w-64 sm:flex-shrink-0 sm:sticky sm:top-8 ${showFilter ? "flex" : "hidden sm:flex"}`}>
                    {FILTERS.map(({ label, toggleKey }) => (
                        <button
                            key={label}
                            type="button"
                            onClick={() => { speciality === (toggleKey || label) ? navigate('/doctors') : navigate(`/doctors/${label}`); setshowFilter(!showFilter) }}
                            className={`filter-item ${speciality === label ? "is-on" : ""}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className='doc-grid flex-1 min-w-0 w-full'>
                    {filterDoc.map((item, index) => (
                        <DoctorCard
                            key={index}
                            item={item}
                            index={index}
                            onClick={() => navigate(`/appointment/${item._id}`)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Doctor;
