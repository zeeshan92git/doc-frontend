import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import DoctorCard from './DoctorCard.jsx';

function TopDoctors() {

  const navigate = useNavigate();
  const { doctorsData } = useContext(AppContext);

  return (
    <section className="section">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <h2 className="t-h2 max-w-[12ch]">Top doctors to book</h2>
        <p className="lede muted max-w-[36ch]">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="doc-grid doc-grid--stagger">
        {doctorsData.map((item, index) => (
          <DoctorCard
            key={index}
            item={item}
            index={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
          />
        ))}
      </div>

      {/* More Button */}
      <div className="mt-12">
        <button
          onClick={() => {
            navigate('/doctors');
            scrollTo(0, 0);
          }}
          className="btn"
        >
          More
          <MoveRight size={18} />
        </button>
      </div>
    </section>
  )
}

export default TopDoctors;
