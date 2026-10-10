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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!backendURL) {
      setStatus('The API URL is missing. Set VITE_BACKEND_URL in the frontend deployment settings.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Sending...');

    try {
      const { data } = await axios.post(backendURL.replace(/\/+$/, '') + '/api/email/send-email', form);
      if (!data.success) {
        setStatus(data.message || 'The server could not save your message.');
        return;
      }

      setStatus(data.notificationSent
        ? 'Message received. A confirmation email was sent.'
        : 'Message received. Our team will review it.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submission failed:', err);
      // Distinguish a server response from a URL, network, or CORS connection failure.
      if (err.response) {
        setStatus(err.response.data?.message || `The API returned an error (HTTP ${err.response.status}).`);
      } else {
        setStatus('Could not reach the API. Check VITE_BACKEND_URL and confirm this site origin is allowed by the backend CORS settings.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-16">
      <header className="pt-8 pb-12 lg:pt-16">
        <h1 className="t-display reveal">Contact us</h1>
      </header>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Office + careers */}
        <div className="lg:col-span-5 flex flex-col gap-8 reveal" style={{ '--i': 1 }}>
          <img
            className="w-full max-w-sm"
            src="https://res.cloudinary.com/dophfzeep/image/upload/v1742205236/contact_image_uc5ctb.png"
            alt=""
          />

          <div className="flex flex-col gap-4 pt-6 border-t border-[var(--rule)]">
            <h2 className="t-h3">Our office</h2>
            <p className="muted leading-8">00000 Willms Station <br /> Suite 000, Washington, USA</p>
            <p className="muted leading-8">Tel: (000) 000-0000 <br /> Email: doccure@gmail.com</p>
          </div>

          <div className="flex flex-col items-start gap-4 pt-6 border-t border-[var(--rule)]">
            <h2 className="t-h3">Careers at DocCure</h2>
            <p className="muted">Learn more about our teams and job openings.</p>
            <button className="btn">Explore jobs</button>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 panel reveal" style={{ '--i': 2 }}>
          <h2 className="t-h2 mb-8">Send us a message</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="field w-full">
                <label className="label" htmlFor="c-name">Your name</label>
                <input
                  id="c-name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="input"
                />
              </div>
              <div className="field w-full">
                <label className="label" htmlFor="c-email">Your email</label>
                <input
                  id="c-email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="c-subject">Your subject</label>
              <input
                id="c-subject"
                type="text"
                name="subject"
                placeholder="Your Subject"
                value={form.subject}
                onChange={handleChange}
                required
                maxLength={160}
                className="input"
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="c-message">Your message</label>
              <textarea
                id="c-message"
                rows="5"
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                maxLength={5000}
                className="textarea"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <button type="submit" disabled={isSubmitting} className="btn btn-solid">
                {isSubmitting ? 'Sending…' : 'Submit'}
              </button>
              <p aria-live="polite" role="status" className="text-sm muted">{status}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
