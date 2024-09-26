'use client';

import React, { useState, useEffect } from 'react';
import OnScrollAnimation from '../../../Components/OnScrollAnimmation';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import Head from 'next/head';

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const elementsToAnimate = [
        ...document.querySelectorAll(".hidden1"),
        ...document.querySelectorAll(".hidden2"),
        ...document.querySelectorAll(".hidden3"),
        ...document.querySelectorAll(".hidden4"),
      ];
      elementsToAnimate.forEach((element) => OnScrollAnimation(element));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        setError('Invalid credentials');
        return;
      }
      router.push('/profile');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
      <Header />
      <div className="flex h-[70vh] justify-center flex-col items-center flex-grow">
        <div className="relative bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
          {/* Profile Icon */}
          <div className="absolute top-[-50px] left-[50%] translate-x-[-50%] bg-gradient-to-br from-red-500 to-red-500 w-20 h-20 rounded-full flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zM7 10a3 3 0 116 0 3 3 0 01-6 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Form */}
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Member Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-400 text-white py-3 rounded-lg font-semibold hover:bg-gradient-to-br hover:from-red-600 hover:to-red-600 shadow-md"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Don't have an account?{' '}
              <span className="text-red-700 font-medium">
                <Link href="/ecnumber">
                  Register
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
