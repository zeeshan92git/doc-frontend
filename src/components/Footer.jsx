import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div className="grid md:grid-cols-12 gap-12">

                {/* Logo, image and description */}
                <div className="md:col-span-6 flex flex-col items-start gap-6">
                    <div
                        onClick={() => { navigate('/'); scrollTo(0, 0); }}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <HeartPulse size={32} className="text-[var(--sage)]" />
                        <span className="font-display font-semibold text-3xl tracking-tight">DocCure</span>
                    </div>

                    <p className="max-w-md text-[var(--sage-2)] leading-8">
                        <span className="font-semibold text-[var(--bone)]">DocCure:</span> Empowering you to take control of your health with a comprehensive directory of doctors and a user-friendly booking system.
                    </p>

                    <img
                        src="https://res.cloudinary.com/dophfzeep/image/upload/v1741950593/header_img_zqsvkx.png"
                        alt="Healthcare Icon"
                        className="w-24 h-24 rounded-full object-cover bg-[var(--moss)]"
                    />
                </div>

                {/* Links */}
                <div className="md:col-span-3">
                    <p className="font-display text-xl mb-6">Company</p>
                    <ul className="flex flex-col gap-4 text-[var(--sage-2)]">
                        <li><NavLink to="/" onClick={() => scrollTo(0, 0)}>Home</NavLink></li>
                        <li><NavLink to="/about" onClick={() => scrollTo(0, 0)}>About us</NavLink></li>
                        <li><NavLink to="/contact" onClick={() => scrollTo(0, 0)}>Contact us</NavLink></li>
                        <li className="hov">Privacy policy</li>
                    </ul>
                </div>

                <div className="md:col-span-3">
                    <p className="font-display text-xl mb-6">Get in touch</p>
                    <ul className="flex flex-col gap-4 text-[var(--sage-2)]">
                        <li className="hov">+1-212-456-7890</li>
                        <li className="hov">doccure@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Bottom copyright */}
            <div className="mt-12 pt-6 border-t border-[rgba(240,233,219,.18)]">
                <p className="text-sm text-[var(--sage)]">
                    © 2025 DocCure.dev - All Rights Reserved.
                </p>
            </div>

            <div className="footer__word" aria-hidden="true">DocCure</div>
        </footer>
    );
}

export default Footer;
