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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">

      {/* Left side: welcome image */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-blue-300 to-blue-500 items-center justify-center p-8">
        <div className="text-center">
          <img
            src="https://res.cloudinary.com/dophfzeep/image/upload/v1745762836/momo-studio-iZZnEuE5R8A-unsplash_mqqzmx.jpg"
            alt="Doctor Appointment"
            className="rounded-lg shadow-lg mb-6 object-cover w-full max-w-sm mx-auto"
          />
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to DocCure
          </h1>
          <p className="text-lg text-white/90">
            Securely book your doctor's appointments in just a few clicks.
          </p>
        </div>
      </div>

      {/* Right side: Form */}
      <form onSubmit={onSubmitHandler} className="flex flex-1 items-center justify-center p-6 bg-blue-100">

        <div className="w-full max-w-md bg-blue-200 p-8 rounded-xl shadow-lg text-gray-700">

          <h2 className="text-2xl font-bold mb-2 text-center">
            {state === 'Sign Up' ? "Create Account" : "Login"}
          </h2>
          <p className="text-center mb-6">
            Please {state === 'Sign Up' ? "sign up" : "login"} to book appointments
          </p>

          {state === 'Sign Up' && (
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            {state === 'Sign Up' ? "Create Account" : "Login"}
          </button>

          <p className="mt-4 text-center text-sm">
            {state === 'Sign Up' ? (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => setState('Login')}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Create a new account?{' '}
                <span
                  onClick={() => setState('Sign Up')}
                  className="text-blue-600 hover:underline cursor-pointer"
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
