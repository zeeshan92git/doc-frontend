import React, { useContext, useState } from 'react';
import axios from "axios";
import { AppContext } from '../context/AppContext';

function Contact() {

  const { backendURL } = useContext(AppContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      await axios.post(backendURL + '/api/email/send-email', form); // your backend route
      setStatus('Message sent! Check your email.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <div className='text-2xl pt-10 text-center'>
        <p className='text-blue-700 text-3xl font-serif font-extrabold tracking-wide'>Contact Us</p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-10 justify-center text-sm mb-28'>
        <img
          className='w-full md:max-w-[360px] p-5'
          src="https://res.cloudinary.com/dophfzeep/image/upload/v1742205236/contact_image_uc5ctb.png"
          alt=""
        />

        <div className='flex flex-col gap-6 items-start'>
          <p className='text-blue-800 font-serif font-semibold text-lg'>OUR OFFICE</p>
          <p className='text-gray-500'>00000 Willms Station <br /> Suite 000, Washington, USA</p>
          <p className='text-gray-500'>Tel: (000) 000-0000 <br /> Email: doccure@gmail.com</p>
          <p className='font-semibold text-blue-800 font-serif text-lg'>CAREERS AT DOCCURE</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className=' text-blue-600 font-semibold border border-blue-600 px-8 py-4 text-sm hover:bg-blue-600 hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-10 bg-blue-200 rounded-md shadow-sm">
        <h2 className="text-2xl font-extrabold font-serif  text-center text-blue-600 mb-8">Send Us a Message</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Your Subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <textarea
            rows="5"
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-300 w-40 self-center"
          >
            Submit
          </button>
          <p className="text-center text-sm mt-2">{status}</p>
        </form>
      </div>
    </div>
  );
}

export default Contact;
