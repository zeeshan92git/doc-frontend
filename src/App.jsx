import React from 'react';  
import Home from "./pages/Home.jsx";
import { Route, Routes } from 'react-router-dom';
import Doctor from './pages/Doctor.jsx';
import Login from './pages/Login.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Myprofile from './pages/Myprofile.jsx';
import Myappointments from './pages/Myappointments.jsx';
import Appointment from './pages/Appointment.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    
    <div className='mx-4 sm:mx-[10] '>
    
    <ToastContainer/>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/doctors' element={<Doctor />} />
      <Route path='/doctors/:speciality' element={<Doctor />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/my-profile' element={<Myprofile />} />
      <Route path='/my-appointments' element={<Myappointments />} />
      <Route path='/appointment/:docId' element={<Appointment />} />
    </Routes>
    <Footer />
    
    </div>
    
  )
}

export default App;