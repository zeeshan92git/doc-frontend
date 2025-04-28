import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from "../context/AppContext.jsx";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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
    <div>

      <p className='pb-3 mt-12 font-medium text-zinc-700 border- b text-xl'> Your Appointments:</p>

      <div>
        {  
          appointments.length ? (
          appointments.map((item, index) => (
            !item.cancelled && (

              <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b bg-blue-50 mb-1' key={index}>

                <div>
                  <img className='w-32 bg-indigo-50' src={item.docData.image} alt="doc_img" />
                </div>
                <div className='flex-1 text-sm text-zinc-600'>
                  <p className='font-semibold text-neutral-800'>{item.docData.name}</p>
                  <p>{item.docData.speciality}</p>
                  <p className='mt-1 font-medium text-zinc-700'>Address:</p>
                  <p className='text-xs'>{item.docData.address.line1}</p>
                  <p className='text-xs'>{item.docData.address.line2}</p>
                  <p className='text-xs'><span className='text-sm text-zinc-700 font-medium'>Date & Time:</span>{dateFormat(item.slotDate)}  &  {item.slotTime}</p>
                </div>

                <div className='flex flex-col gap-2 justify-end'>

                  {!item.cancelled && !item.payment && !item.isCompleted &&
                    <button onClick={() => { setshowStripe(true), setselectedAppoint(item) }}
                      className='text-sm text-stone-500  text-center  sm:min-w-48  py-2 border rounded hover:bg-primary hover:text-white transition-all ' >
                      Pay Online
                    </button>}
                  {!item.cancelled && !item.payment && !item.isCompleted &&
                    <button onClick={() => cancelAppointments(item._id)} className='text-sm text-stone-500  text-center  sm:min-w-48  py-2 border rounded  hover:bg-red-600 hover:text-white transition-all'>Cancel Appointment</button>
                  }
                  {item.payment && !item.isCompleted &&
                     <button disabled className=' text-white text-lg bg-green-500 text-center  sm:min-w-48  py-2 border rounded  hover:text-white transition-all'>Paid</button>
                  }
                  {
                    item.isCompleted && <button className='sm:min-w-48 py-2 border  border-green-500 text-green-500 rounded cursor-auto'>Completed</button>
                  }

                </div>
              </div>

            )
          ))) : <p className='text-center'> Appointments you booked will appear here.</p>
        }
      </div>

      {/* Stripe Checkout Modal */}

      {showStripe && selectedAppoint && (
        <>
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
              <button
                onClick={() => setshowStripe(false)}
                className="absolute top-2 right-3 text-red-500 text-lg font-bold"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center">Secure Payment</h2>
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