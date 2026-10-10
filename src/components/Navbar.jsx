import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HeartPulse, ChevronDown, Menu, ChevronUp } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/doctors', label: 'Doctors' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

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
    <header className="nav">

      {/* Logo */}
      <div onClick={() => navigate('/')} className="brand">
        <span className="brand__mark"><HeartPulse size={20} /></span>
        <span className="brand__name">DocCure</span>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map(({ path, label }) => (
          <NavLink key={path} to={path} className="nav-link">
            <li>{label}</li>
          </NavLink>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {token ? (
          <div ref={dropdownRef} className="relative flex items-center gap-2 cursor-pointer">
            <img src={userData.image} alt="profile" className="avatar" />
            {!showdropDown ?
              <ChevronDown size={20} onClick={() => setshowdropDown(true)} className="text-[var(--ink-2)] hover:text-[var(--brick)] transition-colors" />
              :
              <ChevronUp size={20} onClick={() => setshowdropDown(false)} className="text-[var(--ink-2)] hover:text-[var(--brick)] transition-colors" />
            }
            {/* Dropdown for profile data */}
            {showdropDown &&
              <div className="menu-pop">
                <p onClick={() => { navigate('/my-profile'); setshowdropDown(false); }}>My profile</p>
                <p onClick={() => { navigate('/my-appointments'); setshowdropDown(false); }}>My appointments</p>
                <p onClick={() => { logout(); setshowdropDown(false); }}>Log out</p>
              </div>
            }
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="btn btn-solid btn-sm">
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <Menu className="w-6 h-6 md:hidden cursor-pointer" onClick={() => setShowMenu(true)} />
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="drawer" onClick={() => setShowMenu(false)}>
          <div className="drawer__sheet" onClick={(e) => e.stopPropagation()}>
            <ul className="flex flex-col gap-2 text-lg font-medium">
              {NAV_ITEMS.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setShowMenu(false)}
                  className="nav-link px-4 py-2"
                >
                  {label}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
