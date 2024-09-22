"use client"
import React, { useState, useEffect } from 'react';
import OnScrollAnimation from '../../../Components/OnScrollAnimmation';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import Head from 'next/head';

export default function RegisterForm() {
  useEffect(()=> {
    if (typeof document !== 'undefined') {
      // will run in client's browser only
      var hiddenElements1 = document.querySelectorAll(".hidden3");
      var hiddenElements4 = document.querySelectorAll(".hidden4");
      var hiddenElements2 = document.querySelectorAll(".hidden2");
      var hiddenElements3 = document.querySelectorAll(".hidden1");

    //   var hiddenElement2 = document.querySelectorAll(".hidden2");
    //   var hiddenElement2 = document.querySelectorAll(".hidden3");
       OnScrollAnimation(hiddenElements1)
       OnScrollAnimation(hiddenElements4)
       OnScrollAnimation(hiddenElements2)
        OnScrollAnimation(hiddenElements3)


       //    OnScrollAnimation(hiddenElement2)
    }
    },[]);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await signIn("credentials",{
        redirect: false,
        email,
        password,
      });
      if(res?.error){
        alert("Invalid credentials");
        return
      }
      router.push("/profile")
    } catch (error) {
      alert(error.message)
    }
    
  };

  return (
    <div>
      <Header />
    <div className="flex justify-center items-center my-40 hidden1 flex-col" >
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Member Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C72625]"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C72625]"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-[#C72625]">
          Login
        </button>
      </form>
      <div className='m-2'>
            <p>Don't have an account? <span className='text-blue-700'>
              <Link href={'/ecnumber'}>
                Register
              </Link>
            </span></p>
          </div>
    </div>
    <Footer />
    </div>
  );
}
