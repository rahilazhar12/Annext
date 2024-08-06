'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast'; // Import toast and Toaster from react-hot-toast

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/user-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Handle successful login, e.g., store token, redirect, etc.
      toast.success('Login Successful!');

      // Store user data in session storage
      sessionStorage.setItem('user', JSON.stringify(data));

      // Navigate to the dashboard
      router.push('/dashboard/welcome');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="flex justify-center">
          <FaUserCircle className="text-6xl text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        {error && <p className="text-center text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <AiOutlineMail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <AiOutlineLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
