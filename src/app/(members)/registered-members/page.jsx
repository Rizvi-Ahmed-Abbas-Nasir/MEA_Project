"use client";
import { useState, useEffect } from "react";
import Footer from "../../../Components/Footer";
import Header from "../../../Components/Header";

export default function Page() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_HOST}/api/admin/members`,
                    {
                        method: "GET",
                        headers: {
                            authorization: process.env.NEXT_PUBLIC_API_KEY,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setMembers(data);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        fetchMembers();
    }, []);

    return (
        <div>
            <Header />
            <section className="h-44 bg-[#232323] flex justify-center items-center flex-col text-white">
                <h1 className="text-5xl p-3">Members</h1>
                <p className="text-lg p-3">Home / Members</p>
            </section>
            <section className="py-12 bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {members.map((member) => (
                            <div
                                key={member.memberId}
                                className="bg-white rounded-lg shadow-md p-6"
                            >
                                <h2 className="text-2xl font-bold text-red-600 mb-2">
                                    {member.fullName}
                                </h2>
                                <p className="text-gray-700 mb-1">
                                    <span className="font-semibold">Contact:</span>{" "}
                                    {member.contactNumber}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Designation:</span>{" "}
                                    {member.designation}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
