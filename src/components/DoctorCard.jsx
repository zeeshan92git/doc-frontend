import React from 'react';

// Shared presentational card. Each parent passes its own onClick so the
// original navigation behaviour of every page is preserved exactly.
function DoctorCard({ item, index = 0, onClick }) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick && onClick(e); }}
      role="button"
      tabIndex={0}
      className="doc-card reveal"
      style={{ '--i': index }}
    >
      <div className="doc-card__frame">
        <img src={item.image} alt="doc_img" />
      </div>
      <div className="flex flex-col gap-2 pt-4">
        <div className={`avail ${item.available ? 'is-on' : ''}`}>
          <span className="dot"></span>
          <span>{item.available ? 'Available' : 'Not Available'}</span>
        </div>
        <p className="t-card">{item.name}</p>
        <p className="text-sm muted">{item.speciality}</p>
      </div>
    </div>
  );
}

export default DoctorCard;
