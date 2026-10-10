import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

function About() {
  const faqData = [
    {
      question: "How do I book an appointment?",
      answer:
        "Simply visit the 'Book Appointment' page, select your doctor, choose a time slot, and confirm your booking in a few easy steps.",
    },
    {
      question: "Can I reschedule or cancel my appointment?",
      answer:
        "Yes, you can easily reschedule or cancel your appointments from your dashboard under the 'My Appointments' section.",
    },
    {
      question: "Is there a fee for booking online?",
      answer:
        "No, booking through our platform is completely free! You only pay the consultation charges to the doctor if applicable.",
    },
    {
      question: "Are my medical details kept confidential?",
      answer:
        "Absolutely! Your personal and medical information is highly secure and protected with strict privacy policies.",
    },
  ];

  const whyData = [
    { title: "Efficiency", text: "Streamlined appointment scheduling that fits into your busy lifestyle." },
    { title: "Convenience", text: "Access to a network of trusted healthcare professionals in your area." },
    { title: "Personalization", text: "Tailored recommendations and reminders to help you stay on top of your health." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pb-16">
      <header className="pt-8 pb-12 lg:pt-16">
        <h1 className="t-display reveal">About us</h1>
      </header>

      {/* Introduction */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        <div className="lg:col-span-5 reveal" style={{ '--i': 1 }}>
          <div className="hero-art max-w-sm mx-auto lg:mx-0">
            <div className="hero-art__fill arch" style={{ background: 'linear-gradient(170deg, var(--sage-2), #C6D1B6)' }}>
              <img src="https://res.cloudinary.com/dophfzeep/image/upload/v1742203223/about_image_vgt0cd.png" alt="about_image" style={{ height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 flex flex-col gap-6 leading-8 reveal" style={{ '--i': 2 }}>
          <p>Welcome to DocCure, your trusted partner in managing your healthcare needs conveniently and efficiently. At DocCure, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>DocCure is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <h2 className="t-h3 pt-4">Our vision</h2>
          <p className="muted">Our vision at DocCure is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <section className="section grid lg:grid-cols-12 gap-8 lg:gap-12">
        <h2 className="t-h2 lg:col-span-4">Why choose us</h2>
        <div className="lg:col-span-8">
          {whyData.map((item) => (
            <div key={item.title} className="group grid md:grid-cols-12 gap-4 py-8 border-t border-[var(--rule)] last:border-b transition-colors duration-500 hover:bg-[var(--moss)] hover:text-[var(--bone)] md:px-4">
              <h3 className="t-card md:col-span-5 group-hover:text-[var(--bone)]">{item.title}</h3>
              <p className="md:col-span-7 leading-8 muted group-hover:text-[var(--sage-2)]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ's Section */}
      <section className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        <h2 className="t-h2 lg:col-span-4">Frequently asked questions</h2>

        <div className="lg:col-span-8">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="faq-row"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="flex justify-between items-center gap-4 py-6 text-xl font-medium">
                {faq.question}
                <span>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </h3>

              {openIndex === index && (
                <p className="pb-6 muted leading-8 max-w-[60ch] fade-in">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
