import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { token, setToken, backendURL } = useContext(AppContext);

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendURL + '/api/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendURL + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          console.log(data.message);
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 pb-16 pt-8 lg:pt-16 items-stretch">

      {/* Left side: welcome image */}
      <div className="hidden lg:flex lg:col-span-6 flex-col justify-between gap-8 p-12 rounded-l-[32px] bg-gradient-to-br from-moss to-moss-deep text-bone overflow-hidden relative">
        <h1 className="t-h1 on-dark max-w-[10ch] reveal">Welcome to DocCure</h1>
        <img
          src="https://res.cloudinary.com/dophfzeep/image/upload/v1745762836/momo-studio-iZZnEuE5R8A-unsplash_mqqzmx.jpg"
          alt="Doctor Appointment"
          className="arch object-cover w-full max-w-xs h-80 reveal"
          style={{ '--i': 2 }}
        />
        <p className="text-lg text-[var(--sage-2)] max-w-[32ch]">
          Securely book your doctor's appointments in just a few clicks.
        </p>
      </div>

      {/* Right side: Form */}
      <form onSubmit={onSubmitHandler} className="lg:col-span-6 panel lg:rounded-l-none flex flex-col justify-center reveal" style={{ '--i': 1 }}>

        <div className="w-full max-w-md mx-auto flex flex-col gap-8">

          <div className="flex flex-col gap-2">
            <h2 className="t-h2">
              {state === 'Sign Up' ? "Create account" : "Login"}
            </h2>
            <p className="muted">
              Please {state === 'Sign Up' ? "sign up" : "login"} to book appointments
            </p>
          </div>

          {state === 'Sign Up' && (
            <div className="field">
              <label className="label" htmlFor="l-name">Full name</label>
              <input
                id="l-name"
                type="text"
                className="input"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div className="field">
            <label className="label" htmlFor="l-email">Email</label>
            <input
              id="l-email"
              type="email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="l-pass">Password</label>
            <input
              id="l-pass"
              type="password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button type="submit" className="btn btn-solid btn-block">
            {state === 'Sign Up' ? "Create account" : "Login"}
          </button>

          <p className="text-sm muted">
            {state === 'Sign Up' ? (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => setState('Login')}
                  className="text-[var(--ink)] font-medium underline underline-offset-4 decoration-[var(--brick)] cursor-pointer hover:text-[var(--brick)] transition-colors"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Create a new account?{' '}
                <span
                  onClick={() => setState('Sign Up')}
                  className="text-[var(--ink)] font-medium underline underline-offset-4 decoration-[var(--brick)] cursor-pointer hover:text-[var(--brick)] transition-colors"
                >
                  Click here
                </span>
              </>
            )}
          </p>

        </div>

      </form>
    </div>
  );
}

export default Login;
