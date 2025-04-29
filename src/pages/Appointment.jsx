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
      const { data } = await axios.post(`${backendURL}/api/user/book-appointment`, { docId, slotDate, slotTime }, { headers: { token } });

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Doctor Profile Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-1/3 w-full flex justify-center">
          <img className="bg-primary w-70 sm:w-full max-w-xs rounded-lg" src={docInfo.image} alt="profile_img" />
        </div>

        <div className="flex-1 border border-gray-300 rounded-lg p-5 bg-white sm:mt-0 mt-4">
          <p className="flex items-center gap-2 text-xl sm:text-2xl font-medium text-gray-800">
            {docInfo.name} <ShieldCheck className="text-blue-700 w-5 sm:w-6" />
          </p>

          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-lg mt-2 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <span className="py-0.5 px-2 border border-stone-300 text-xs rounded-full">{docInfo.experience}</span>
          </div>

          <div className="flex flex-col gap-2 mt-3 text-sm sm:text-base text-gray-700">
            <p className="flex items-center gap-1 text-[15px] font-medium text-gray-700">
              About <ShieldAlert className="w-4" />
            </p>
            <p className="text-gray-500">{docInfo.about}</p>
            <p className="text-base mt-2 pb-2">
              Appointment Fee: <span className="font-semibold">${docInfo.fee}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Booking Slots Section */}
      <div className="mt-6 px-2 sm:px-20">
        <p className="text-lg font-semibold text-gray-800">Booking Slots</p>
        <p className="text-red-600 flex items-center gap-2">
          <Clock className="w-4 h-4" /> 10:00 AM - 8:30 PM
        </p>

        {/* Date Selectors */}
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {doctSlots.map((daySlots, index) => (
            <div
              key={index}
              onClick={() => setslotIndx(index)}
              className={`text-center py-4 px-3 min-w-[60px] rounded-full cursor-pointer flex-shrink-0 ${
                slotIndx === index ? 'bg-primary text-white' : 'border border-gray-200 bg-blue-50'
              }`}
            >
              <p>{daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}</p>
              <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex gap-3 mt-4 overflow-x-auto whitespace-nowrap">
          {doctSlots[slotIndx]?.map((slot, index) => (
            <p
              key={index}
              onClick={() => setslotTime(slot.time)}
              className={`text-sm font-light px-5 py-2 rounded-full cursor-pointer flex-shrink-0 ${
                slot.time === slotTime ? 'bg-primary text-white' : 'border border-gray-200 bg-blue-50'
              }`}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>

        {/* Booking Button */}
        <div className="mt-6 text-center">
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-medium rounded-full px-10 py-3"
          >
            Book an Appointment
          </button>
        </div>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
}

export default Appointment;
