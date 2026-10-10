import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from "../context/AppContext.jsx";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { X } from 'lucide-react';
import StripeCheckout from '../components/StripeCheckout.jsx';

function Myappointments() {
  const stripePromise = loadStripe('pk_test_51RFCSp2cU2hclMDYhfqwNCltMbj7U61CSiHzY7Xm7TUBigJ97MMcdupXeTPiCh52DpNftsZdYi3YY9imWJcjv8gX009JS3VGOx');

  const { backendURL, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [showStripe, setshowStripe] = useState(false);
  const [selectedAppoint, setselectedAppoint] = useState([]);


  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/user/appointments', { headers: { token } });

      if (data.success) {
        setAppointments(data.data);
        //toast.success(data.message);
        console.log("user booked appointments" , data.data);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const cancelAppointments = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendURL + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      }
      else {
        console.log(data.message);
        toast.error(error.message);
      }
    }
    catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const updatePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendURL + '/api/user/update-payment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      }
      else {
        console.log(data.message);
        toast.error(error.message);
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }

  };


  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token])

  return (
    <div className="pb-16">

      <header className="pt-8 pb-12 lg:pt-16">
        <h1 className="t-h1 reveal">Your appointments</h1>
      </header>

      <div className="border-t border-[var(--rule)]">
        {
          appointments.length ? (
          appointments.map((item, index) => (
            !item.cancelled && (

              <div className='appt reveal' style={{ '--i': index }} key={index}>

                <div>
                  <img className='appt__img' src={item.docData.image} alt="doc_img" />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='t-card'>{item.docData.name}</p>
                  <p className='muted'>{item.docData.speciality}</p>
                  <p className='mt-4 label'>Address</p>
                  <p className='text-sm'>{item.docData.address.line1}</p>
                  <p className='text-sm'>{item.docData.address.line2}</p>
                  <p className='mt-2 text-sm'><span className='label mr-2'>Date &amp; time</span><span className='data'>{dateFormat(item.slotDate)}  &  {item.slotTime}</span></p>
                </div>

                <div className='flex flex-col gap-2 md:min-w-48'>

                  {!item.cancelled && !item.payment && !item.isCompleted &&
                    <button onClick={() => { setshowStripe(true); setselectedAppoint(item) }}
                      className='btn btn-sm btn-solid' >
                      Pay online
                    </button>}
                  {!item.cancelled && !item.payment && !item.isCompleted &&
                    <button onClick={() => cancelAppointments(item._id)} className='btn btn-sm btn-brick'>Cancel appointment</button>
                  }
                  {item.payment && !item.isCompleted &&
                     <button disabled className='btn btn-sm btn-ok'>Paid</button>
                  }
                  {
                    item.isCompleted && <button className='btn btn-sm !border-[var(--ok)] !text-[var(--ok)] !cursor-auto'>Completed</button>
                  }

                </div>
              </div>

            )
          ))) : <p className='py-12 muted'> Appointments you booked will appear here.</p>
        }
      </div>

      {/* Stripe Checkout Modal */}

      {showStripe && selectedAppoint && (
        <>
          <div className="modal-back">
            <div className="modal">
              <button
                onClick={() => setshowStripe(false)}
                className="absolute top-4 right-4 text-[var(--ink-2)] hover:text-[var(--brick)] transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <h2 className="t-h3 mb-6">Secure payment</h2>
              <Elements stripe={stripePromise}>
                <StripeCheckout
                  amount={selectedAppoint.docData.fee}
                  appointmentId={selectedAppoint._id}
                  doctorname={selectedAppoint.docData.name}
                  slotTime={selectedAppoint.slotTime}
                  slotDate={selectedAppoint.slotDate}
                  phone={selectedAppoint.userData.phone}
                  onSuccess={async () => {
                    setshowStripe(false);
                    getUserAppointments();
                    updatePayment(selectedAppoint._id);
                  }}
                />
              </Elements>
            </div>
          </div>
        </>
      )}

    </div>
  )
};

export default Myappointments;
