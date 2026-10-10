import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShieldCheck, ShieldAlert, Clock } from 'lucide-react';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

function Appointment() {
  const { docId } = useParams();
  const { doctorsData, getDoctorsData, backendURL, token } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [doctSlots, setdocSlots] = useState([]);
  const [slotIndx, setslotIndx] = useState(0);
  const [slotTime, setslotTime] = useState('');
  const [docInfo, setdocInfo] = useState(null);

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    if (doctorsData) {
      const foundDoc = doctorsData.find(doc => doc._id == docId);
      setdocInfo(foundDoc);
    }
  };

  const to24Hour =  function (time) {
    const match = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i.exec(time.trim());

    if (!match) return time;

    const hour = (Number(match[1]) % 12) +
      (match[3].toLowerCase() === "pm" ? 12 : 0);

    return `${String(hour).padStart(2, "0")}:${match[2]}`;
  }

  const getAvailableSlots = async () => {
    const allSlots = [];
    setdocSlots([]);
    let today = new Date();
    const todayDate = today.getDate();

    for (let i = 0; i < 7; i++) {
      const currDate = new Date(today);
      currDate.setDate(todayDate + i);

      const endTime = new Date(currDate);
      endTime.setHours(21, 0, 0, 0);

      let startTime = new Date(currDate);

      if (currDate.getDate() === todayDate) {
        let currentHour = today.getHours();
        let currentMinutes = today.getMinutes();

        if (currentHour >= 21) {
          allSlots.push([]);
          continue;
        }

        if (currentMinutes >= 30) {
          startTime.setHours(currentHour + 1, 0, 0, 0);
        } else {
          startTime.setHours(currentHour, 30, 0, 0);
        }

        if (startTime.getHours() < 10) {
          startTime.setHours(10, 0, 0, 0);
        }
      } else {
        startTime.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      let currentTime = new Date(startTime);

      while (currentTime < endTime) {
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

        const slotDate = `${currDate.getDate()}_${currDate.getMonth() + 1}_${currDate.getFullYear()}`;
        const slotTime = formattedTime;

        const isAvailable = !(docInfo.slots_booked[slotDate]?.includes(slotTime));
        if (isAvailable) {
          timeSlots.push({
            datetime: new Date(currentTime),
            time: formattedTime,
          });
        }

        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setdocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      toast.warn('Please select a time slot');
      return;
    }

    try {
      const date = doctSlots?.[slotIndx]?.[0]?.datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
      const { data } = await axios.post(`${backendURL}/api/user/book-appointment`,
        { docId, slotDate, slotTime: to24Hour(slotTime) },
        {
          headers: { token }
        });

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  useEffect(() => {
    if (doctorsData) fetchDocInfo();
  }, [doctorsData, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  if (!docInfo) {
    return <div className="section muted">Loading...</div>;
  }

  return (
    <div>
      {/* Doctor Profile Section */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 pt-8 lg:pt-16 items-end">
        <div className="lg:col-span-4 reveal">
          <div className="hero-art max-w-xs mx-auto lg:mx-0">
            <div className="hero-art__fill arch">
              <img src={docInfo.image} alt="profile_img" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6 reveal" style={{ '--i': 2 }}>
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="t-h1 flex items-center gap-4">
              {docInfo.name} <ShieldCheck className="text-[var(--moss)] w-8 h-8" />
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-lg muted">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <span className="py-2 px-4 border border-[var(--ink)] rounded-full text-sm text-[var(--ink)]">{docInfo.experience}</span>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-[var(--rule)]">
            <p className="flex items-center gap-2 font-medium">
              About <ShieldAlert className="w-4 h-4" />
            </p>
            <p className="muted max-w-[64ch] leading-8">{docInfo.about}</p>
            <p className="text-lg">
              Appointment fee: <span className="data font-medium text-xl">${docInfo.fee}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Booking Slots Section */}
      <div className="mt-16 lg:mt-24 grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h2 className="t-h2">Booking slots</h2>
          <p className="flex items-center gap-2 text-[var(--brick)] data">
            <Clock className="w-4 h-4" /> 10:00 AM - 8:30 PM
          </p>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8 min-w-0">
          {/* Date Selectors */}
          <div className="scroll-x">
            {doctSlots.map((daySlots, index) => (
              <div
                key={index}
                onClick={() => setslotIndx(index)}
                className={`date-chip ${slotIndx === index ? 'is-on' : ''}`}
              >
                <small>{daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}</small>
                <b>{daySlots[0] && daySlots[0].datetime.getDate()}</b>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="flex flex-wrap gap-4">
            {doctSlots[slotIndx]?.map((slot, index) => (
              <p
                key={index}
                onClick={() => setslotTime(slot.time)}
                className={`chip ${slot.time === slotTime ? 'is-on' : ''}`}
              >
                {slot.time.toLowerCase()}
              </p>
            ))}
          </div>

          {/* Booking Button */}
          <div>
            <button onClick={bookAppointment} className="btn btn-solid">
              Book an appointment
            </button>
          </div>
        </div>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
}

export default Appointment;
