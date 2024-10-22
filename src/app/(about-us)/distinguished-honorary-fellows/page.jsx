"use client";
import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';

const DistinguishedHonoraryFellows = () => {
    const [profiles, setProfiles] = useState([]);

    // Function to fetch profile data from the API
    const fetchProfiles = async () => {
        try {
            const response = await fetch('/api/admin/honorary');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProfiles(data); // Assume the data is an array of profile objects
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    // Fetch profiles when the component mounts
    useEffect(() => {
        fetchProfiles();
    }, []);

    return (
        <>
            <Header />
            <main>
                <section className="h-44 bg-[#232323] flex justify-center items-center flex-col text-white">
                    <h1 className="text-5xl p-3">Distinguished Honorary Fellows</h1>
                    <p className="text-lg p-3"> About Us / Distinguished Honorary Fellows</p>
                </section>
                <section className='px-5 sm:px-10 py-10'>
                    <div className='flex flex-wrap justify-center gap-5'>
                        {profiles.map((profile, index) => (
                            <div key={index} className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white mb-5 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-800 dark:text-white">{profile.name}</h5>
                                    <p className='text-center text-gray-600 dark:text-gray-300'>{profile.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default DistinguishedHonoraryFellows;
