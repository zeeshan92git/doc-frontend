import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

function Footer() {
    const navigate = useNavigate();

    return (
        <div className="bg-blue-100 text-gray-300 py-5 px-6 rounded-md shadow-md mt-4 w-full mb-0 ">
            {/* Main Content Area */}
            <div className="flex flex-col items-center gap-10 mb-5">
                {/* Logo, Image and Description */}
                <div className="text-center flex flex-col items-center gap-2 ">
                    <div 
                        onClick={() => { navigate('/'); scrollTo(0, 0); }} 
                        className="flex items-center gap-0 cursor-pointer"
                    >
                        <HeartPulse size={36} className="text-blue-700" />
                        <span className="font-bold text-2xl  md:text-3xl text-blue-900">
                            DocCure
                        </span>
                    </div>
                    
                    {/* Footer Image */}
                    <img 
                        src="https://res.cloudinary.com/dophfzeep/image/upload/v1741950593/header_img_zqsvkx.png" 
                        alt="Healthcare Icon" 
                        className="w-20 h-20 rounded-full shadow-lg shadow-blue-950"
                    />

                    <p className="text-gray-800 leading-4 max-w-md mx-auto mt-2 text-sm md:text-base">
                        <span className="font-bold text-stone-900">DocCure:</span> Empowering you to take control of your health with a comprehensive directory of doctors and a user-friendly booking system.
                    </p>
                </div>

                {/* Links Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20 text-center md:text-left">
                    {/* Company Section */}
                    <div>
                        <p className="mb-2 font-bold text-stone-700 text-xl">Company</p>
                        <ul className="flex flex-col gap-2 text-sm text-stone-600">
                            <NavLink to="/" className="hover:text-blue-700 transition-colors">
                                <li onClick={() => scrollTo(0, 0)}>Home</li>
                            </NavLink>
                            <NavLink to="/about" className="hover:text-blue-700 transition-colors">
                                <li onClick={() => scrollTo(0, 0)}>About Us</li>
                            </NavLink>
                            <NavLink to="/contact" className="hover:text-blue-700 transition-colors">
                                <li onClick={() => scrollTo(0, 0)}>Contact Us</li>
                            </NavLink>
                            <li className="hover:text-blue-700 transition-colors">Privacy Policy</li>
                        </ul>
                    </div>

                    {/* Get In Touch Section */}
                    <div>
                        <p className="mb-2 font-bold text-stone-700 text-xl">Get In Touch</p>
                        <ul className="flex flex-col gap-2 text-sm text-stone-600">
                            <li className="hover:text-blue-700 transition-colors">+1-212-456-7890</li>
                            <li className="hover:text-blue-700 transition-colors">doccure@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom copyright */}
            <div className="border-t border-gray-700 pt-5">
                <p className="text-xs md:text-sm text-gray-500 text-center">
                    © 2025 DocCure.dev - All Rights Reserved.
                </p>
            </div>

        </div>
    );
}

export default Footer;
