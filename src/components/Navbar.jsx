import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HeartPulse, ChevronDown, Menu, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400 px-6 md:px-10 lg:px-20 xl:px-28">
      
      {/* Logo */}
      <div onClick={() => navigate('/')} className="flex items-center gap-1 cursor-pointer">
        <HeartPulse size={36} className="text-blue-600" />
        <div className="font-bold text-2xl md:text-3xl text-blue-900 font-sans">
          DocCure
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-6 font-medium">
        {['/', '/doctors', '/about', '/contact'].map((path, idx) => (
          <NavLink key={idx} to={path} className="relative group">
            <li className="py-1 hover:text-blue-600 transition-colors"> 
              {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
            </li>
            <hr className="border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden group-hover:block" />
          </NavLink>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative flex items-center cursor-pointer group">
            <img
              src={userData.image}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <ChevronDown size={20} className="text-black ml-1" />
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 hidden group-hover:flex flex-col gap-3 bg-stone-100 rounded-lg shadow-md p-6 min-w-48 text-gray-600 text-base font-medium z-10 ">
              <p onClick={() => navigate('/my-profile')} className="hover:text-blue-700 hover:underline cursor-pointer">My Profile</p>
              <p onClick={() => navigate('/my-appointments')} className="hover:text-blue-700 hover:underline cursor-pointer ">My Appointments</p>
              <p onClick={logout} className="hover:text-blue-700 hover:underline cursor-pointer">Log out</p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block bg-primary text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 transition-all"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <Menu className="w-6 h-6 md:hidden cursor-pointer" onClick={() => setShowMenu(true)} />
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-30 bg-blue-100 p-6 flex flex-col gap-4 max-h-fit">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <HeartPulse size={36} className="text-blue-600" />
              <p className="font-bold text-2xl text-blue-900">DocCure</p>
            </div>
            <X onClick={() => setShowMenu(false)} className="text-gray-700 w-8 h-8 cursor-pointer" />
          </div>

          {/* Divider */}
          <hr className="border-gray-400" />

          {/* Mobile Nav Links */}
          <ul className="flex flex-col items-center gap-6 text-lg font-medium mt-8">
            {['/', '/doctors', '/about', '/contact'].map((path, idx) => (
              <NavLink
                key={idx}
                to={path}
                onClick={() => setShowMenu(false)}
                className="px-4 py-2 rounded hover:bg-primary text-blue-700 hover:text-white w-full text-center"
              >
                {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
