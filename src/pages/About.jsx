import React, { useState, useEffect } from 'react';

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

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className="text-center text-2xl text-gray-500 pt-10">
        <p className="text-blue-700 text-3xl font-serif font-extrabold tracking-wide">ABOUT US</p>
      </div>

      {/* Introduction */}
      <div className="my-10 flex flex-col md:flex-row gap-12 px-4">
        <img className="w-full md:max-w-[360px] p-5" src="https://res.cloudinary.com/dophfzeep/image/upload/v1742203223/about_image_vgt0cd.png" alt="about_image" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 p-5">
          <p>Welcome to DocCure, your trusted partner in managing your healthcare needs conveniently and efficiently. At DocCure, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>DocCure is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <b className="text-blue-800 font-serif text-lg">Our Vision</b>
          <p>Our vision at DocCure is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-xl my-4 md:pl-6">
        <span className="text-blue-600 font-serif font-semibold">WHY CHOOSE US</span>
      </div>
      <div className="flex flex-col md:flex-row mb-20 text-sm md:ml-4 md:mr-4">
        <div className="border px-10 md:px-16 py-4 sm:py-16 flex flex-col gap-5 text-sm hover:bg-primary hover:text-white text-gray-500 transition-all duration-300 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

        <div className="border px-10 md:px-16 py-4 sm:py-16 flex flex-col gap-5 text-sm hover:bg-primary hover:text-white text-gray-500 transition-all duration-300 cursor-pointer">
          <b>CONVENIENCE:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>

        <div className="border px-10 md:px-16 py-4 sm:py-16 flex flex-col gap-5 text-sm hover:bg-primary hover:text-white text-gray-500 transition-all duration-300 cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

      {/* FAQ's Section */}
      <div className="p-8 bg-blue-100 rounded-3xl shadow-2xl my-12">
        <h2 className="flex items-center justify-center gap-2 text-3xl font-extrabold text-center text-blue-700 font-serif mb-10 tracking-wide">
          <p className="text-red-500 text-3xl"> ?</p>
          <p>Frequently Asked Questions</p>
        </h2>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-xl font-bold text-gray-800 flex justify-between items-center">
                {faq.question}
                <span className="text-2xl">
                  {openIndex === index ? "-" : "+"}
                </span>
              </h3>

              {openIndex === index && (
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
