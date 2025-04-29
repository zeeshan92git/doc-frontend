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
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between  gap-2 text-sm py-4 mb-5 border-b border-gray-400 px-6 md:px-10 lg:px-20 xl:px-28">

      {/* Logo */}
      <div onClick={() => navigate('/')} className="flex items-center gap-0">
        <HeartPulse size={34} className="text-blue-600" />
        <div className="text-2xl md:text-3xl text-blue-900 font-bold">
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
            className="bg-primary text-white px-4 py-1 rounded-full text-xs sm:px-5 sm:py-2 sm:text-sm md:px-6 md:py-2 md:text-sm   whitespace-nowrap hover:bg-blue-700 transition-all"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <Menu className="w-6 h-6  sm:w-4 sm:h-4 md:hidden cursor-pointer" onClick={() => setShowMenu(true)} />
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-20"
          onClick={() => setShowMenu(false)} // Clicking on the background closes the menu
        >
          <div
            className="fixed top-16 right-0 bg-blue-200 p-6 flex flex-col gap-2 max-h-fit w-fit shadow-md shadow-blue-50 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Clicking inside the menu will NOT close
          >
            {/* Mobile Nav Links */}
            <ul className="flex flex-col items-center gap-2 text-lg font-medium mt-4">
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
        </div>
      )}


    </div>
  );
}

export default Navbar;
