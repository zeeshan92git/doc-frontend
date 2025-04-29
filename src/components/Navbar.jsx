import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HeartPulse, ChevronDown, Menu, ChevronUp } from 'lucide-react';
import { AppContext } from '../context/AppContext';

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showdropDown, setshowdropDown] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  function logout() {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setshowdropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


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
            <li className="text-gray-600 py-1 hover:text-blue-600 transition-colors">
              {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
            </li>
            <hr className="border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden group-hover:block" />
          </NavLink>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {token ? (
          <div ref={dropdownRef} className="relative flex items-center cursor-pointer">
            <img
              src={userData.image}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            {!showdropDown ?
              <ChevronDown size={20} onClick={() => setshowdropDown(true)} className="text-gray-600 hover:text-blue-600 ml-1" />
              :
              <ChevronUp size={20} onClick={() => setshowdropDown(false)} className="text-gray-600 ml-1 hover:text-blue-600" />
            }
            {/* Dropdown for profile data */}
            {showdropDown &&
              <div className="absolute right-0 top-full mt-2 sm:mt-3 md:mt-4 flex flex-col gap-3 sm:gap-4 bg-blue-100 rounded-lg shadow-md shadow-blue-50 p-6 w-44 sm:w-48 md:w-56 text-gray-600 text-sm sm:text-base font-medium z-10">
                <p onClick={() => { navigate('/my-profile'); setshowdropDown(false); }} className="hover:text-blue-600  cursor-pointer">My Profile</p>
                <p onClick={() => { navigate('/my-appointments'); setshowdropDown(false); }} className="hover:text-blue-600  cursor-pointer ">My Appointments</p>
                <p onClick={() => { logout(); setshowdropDown(false); }} className="hover:text-blue-600 cursor-pointer">Log out</p>
              </div>
            }
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
      {showMenu && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-20"
          onClick={() => setShowMenu(false)} // Clicking on the background closes the menu
        >
          <div
            className="fixed top-16 right-0 bg-blue-100 p-6 flex flex-col gap-2 max-h-fit w-fit shadow-md shadow-blue-50 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Clicking inside the menu will NOT close
          >
            {/* Mobile Nav Links */}
            <ul className="flex flex-col items-center gap-2 text-lg font-medium mt-4">
              {['/', '/doctors', '/about', '/contact'].map((path, idx) => (
                <NavLink
                  key={idx}
                  to={path}
                  onClick={() => setShowMenu(false)}
                  className="px-4 py-2 rounded  text-gray-600 hover:text-blue-600 w-full text-center"
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
